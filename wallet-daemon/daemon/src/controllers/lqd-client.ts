import {LQDClientFactory} from "../lqd-wallet-client-factory/lqd-client.factory";
import {LQDClient, Signature, Transfer, Wallet} from "lqd-wallet-client";
import {
    bufferToHex,
    bufferToInt,
    ecsign,
    fromSigned,
    hashPersonalMessage, privateToAddress,
    toBuffer, toChecksumAddress,
    toUnsigned
} from "ethereumjs-util";
import {isSameHexValue, remove0xPrefix} from "lqd-wallet-client/util";
import {WalletUpdateError} from "lqd-wallet-client/models/state/wallet-update-error.model";
import {LoggingService} from "../lqd-wallet-client-factory/logging.service";
import {TransferDataInterface} from "lqd-wallet-client/interfaces/data.interface";
import BigNumber from "bignumber.js"
import Web3Utils from 'web3-utils'
import TransactionStatus from "../models/transaction-status";
import {TransferAggregateType} from "lqd-wallet-client/models/transactions/transfer-aggregate-type.model";

const fs = require("fs");

const config = JSON.parse(fs.readFileSync(`/code/config.json`));


function padWithZeroes(numb, length) {
    let myString = '' + numb;
    while (myString.length < length) {
        myString = '0' + myString
    }
    return myString
}

function concatSig(v, r, s) {
    const rSig = fromSigned(r);
    const sSig = fromSigned(s);
    const vSig = bufferToInt(v);
    const rStr = remove0xPrefix(padWithZeroes(bufferToHex(toUnsigned(rSig)), 64));
    const sStr = remove0xPrefix(padWithZeroes(bufferToHex(toUnsigned(sSig)), 64));
    const vStr = remove0xPrefix(vSig.toString(16));
    return remove0xPrefix(rStr.concat(sStr).concat(vStr));
}

function signMessageRSV(data, privKey) {
    console.log('Signing message...', data);
    const messageLqdWrapped = Web3Utils.soliditySha3('\x19Liquidity.Network Authorization:\n32', data)
    const message = toBuffer(messageLqdWrapped);
    const msgHash = hashPersonalMessage(message);
    const sig = ecsign(msgHash, new Buffer(privKey.slice(2), 'hex'));
    return concatSig(sig.v, sig.r, sig.s);
}

export function signMessageHubModel(data, privKey) {
    const sig = signMessageRSV(data, privKey)
    const pubkey = toChecksumAddress(bufferToHex(privateToAddress(toBuffer(privKey))))
    return Signature.fromRSV(pubkey, data, sig)
}

function transferDataToTransfer(isIncomingPending: boolean): (TransferDataInterface) => Transfer {
    return (transferData: TransferDataInterface): Transfer => {
        const transfer = new Transfer(
            transferData.wallet.token,
            transferData.wallet.address,
            transferData.round,
            new BigNumber(transferData.amount),
            null,
            null,
            transferData.recipient.token,
            transferData.recipient.address,
            transferData.recipient_trail_identifier,
            transferData.wallet.address,
            new BigNumber(transferData.nonce),
            transferData.id);
        if (isIncomingPending) {
            transfer.authorizations.set(TransferAggregateType.DEBIT, transferData.sender_aggregate);
        }
        return transfer;
    };
}

async function faucetSend(wallet, dest, privKey, amount) {
    let preparedTransfer
    try {
        preparedTransfer = await lqdClient.prepareOutgoingTransfer(
            wallet,
            dest,
            new BigNumber(amount)
        )
    } catch (err) {
        console.log("Prepare transfer failed: ", err)
        return Promise.reject('Address not registred')
    }

    if (!preparedTransfer.transfer) {
        return Promise.reject('Failed to prepare transfer..')
    }

    const agreggSig = signMessageHubModel(
        preparedTransfer.hashes.aggregate,
        privKey
    )
    const markerSig = signMessageHubModel(
        preparedTransfer.hashes.marker,
        privKey
    )

    let resp
    try {
        resp = await lqdClient.sendOutgoingTransfer(
            wallet,
            preparedTransfer,
            agreggSig,
            markerSig
        )
    } catch (err) {
        console.log("sendOutgoingTransfer fialed: ", err)
        return Promise.reject('Unknown hub error')
    }

    console.log('Off-chain TX sent')
    return Promise.resolve()
}

const validateReceipt = async (state, timeout = 120) => {
    console.log(`timeout: ${timeout}`)
    if (timeout === 0) {
        return false
    }

    const confirmation = state.wallet.latestRound.aggregate.isTransferPending
    console.log(`Is pending ${JSON.stringify(confirmation)}`)
    if (confirmation === false) {
        return true
    } else {
        return await (new Promise(resolve => {
            setTimeout(async () => {
                resolve(await validateReceipt(state, timeout - 1))
            }, 1000)
        }))
    }
}

const PRIVATE_KEY = config.ETHEREUM_WALLET_PRIVATE_KEY;

let lqdClient = LQDClientFactory(config.ETHEREUM_NODE_URL);

lqdClient.web3Service.rpc.eth.sign = function (accountAddress, data, callback) {
    callback(null, signMessageRSV(data, PRIVATE_KEY));
};
lqdClient.web3Service.rpc.personal.sign = null;

const address = toChecksumAddress(bufferToHex(privateToAddress(toBuffer(PRIVATE_KEY))));
console.log(`Wallet: ${address}`);

let clientWallet
const paymentsMap = new Map<number, any>();

const init = async () => {
    const contractOwner = await lqdClient.contractApiService.getHubOwnerAddress(config.HUB_CONTRACT_ADDRESS)
    clientWallet = new Wallet(
        address,
        parseInt(config.ETHEREUM_NETWORK_ID),
        contractOwner,
        config.HUB_CONTRACT_ADDRESS,
        config.TOKEN_CONTRACT_ADDRESS,
        config.HUB_PROVIDER_URL);

    let walletState
    lqdClient.walletStateSyncObservable.subscribe(next => {
        walletState = next
        console.log('STATE!');
        console.log(next.updateError);
        clientWallet.lock.runExclusive(async () => {
            console.log('RUN!')
            const wallet = next.wallet;

            if (next.updateError === WalletUpdateError.UNREGISTERED_NO_REQUEST) {
                const digest = await lqdClient.getAdmissionDigest(wallet)
                const authorization = Signature.fromRSV(address, digest, signMessageRSV(digest, PRIVATE_KEY));
                try {
                    await lqdClient.hubApiService.register(wallet, authorization);
                    LoggingService.log('registered');
                } catch (err) {
                    LoggingService.error('registration error');
                }
            } else if (!next.updateError) {
                if (wallet.latestRound.aggregate.pendingTransfer) {
                    console.log('Pending transfer confirmation..');
                } else if (wallet.latestRound.pendingIncomingTransfers && wallet.latestRound.pendingIncomingTransfers.length > 0) {
                    const transfer = transferDataToTransfer(true)(wallet.latestRound.pendingIncomingTransfers[0]);
                    const receipt = LQDClient.prepareReceipt(wallet, transfer);

                    const digest = receipt.hashes.aggregate;
                    const sig = signMessageRSV(digest, PRIVATE_KEY);
                    const authorization = Signature.fromRSV(address, digest, sig);

                    try {
                        const sent = await lqdClient.sendIncomingTransferReceipt(wallet, receipt, authorization)
                        if (!sent) {
                            LoggingService.error('rejected receipt!');
                        } else {
                            LoggingService.error('receipt sent.. waiting for confirmation.');
                        }
                    } catch (err) {
                        LoggingService.error('error sending receipt');
                    }
                } else {
                    for (let i = wallet.registrationRound; i <= wallet.latestRound.roundNumber; i++) {
                        const round = wallet.getRound(i);
                        for (let tx of round.aggregate.transfers) {
                            if (!isSameHexValue(tx.recipient, address) || !tx.confirmations.get(TransferAggregateType.CREDIT)) {
                                continue;
                            }

                            paymentsMap.set(tx.txId, {
                                nonce: tx.nonce,
                                amount: tx.amount.toFixed(0),
                                transactionId: tx.txId,
                                recipient: tx.recipient,
                                sender: tx.sender,
                                status: TransactionStatus.fromBoolean(typeof tx.confirmations.get(TransferAggregateType.CREDIT) !== 'undefined')
                            });
                        }
                    }

                    const dump = JSON.stringify([...paymentsMap]);
                    console.log(dump);

                    fs.writeFile('./tx_dump.json', dump, (err) => {
                        if (err) {
                            return console.log(`ERROR: ${err}`);
                        }
                        console.log('Transfers dumped!')
                    });
                }
            } else {
                LoggingService.error(`CONTRACT STATE ${next.contractState}`);
                if (next.contractState) {
                    LoggingService.error(`ROUND: ${next.contractState.currentRound}`);
                    LoggingService.error(`SUB BLOCK: ${next.contractState.currentSubBlock}`);
                    LoggingService.error(`LAST SUBMISSION: ${next.contractState.lastSubmissionRound}`);
                    LoggingService.error(`EXTENDED SLACK: ${next.contractState.extendedSlackPeriod}`);
                    LoggingService.error(`SUBMITTED: ${next.contractState.isCheckpointSubmitted}`);
                }
                LoggingService.error(`LATEST ROUND: ${wallet.latestRound.roundNumber}`);

                const merkleProofData = next.hubState.walletData.merkle_proofs.find(
                    (value) => value.round_number == wallet.latestRound.roundNumber);

                LoggingService.error(`MERKLE PROOF ${merkleProofData}`);
            }
        });
    });
}

export default class LQDManager {
    public static client() {
        return lqdClient
    }

    public static hubProvider() {
        return {
            networkId: config.ETHEREUM_NETWORK_ID,
            contract: config.HUB_CONTRACT_ADDRESS,
            url: config.HUB_PROVIDER_URL,
        }
    }

    public static payments() {
        return [...paymentsMap.keys()].reduce((acc, key) =>
            Object.defineProperty(
                acc,
                key,
                {value: paymentsMap.get(key), enumerable: true}
                ),
            {}
        )
    }

    public static privateKey() {
        return config.ETHEREUM_WALLET_PRIVATE_KEY
    }

    public static async start({initialDelay = 250, period = 10000}: { initialDelay?: number, period?: number }) {
        await init()
        console.log(clientWallet)
        lqdClient.synchronizationPollService.startSynchronization(clientWallet, initialDelay, period);
    }

    public static wallet() {
        return clientWallet
    }
}