"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lqd_client_factory_1 = require("../lqd-wallet-client-factory/lqd-client.factory");
const lqd_wallet_client_1 = require("lqd-wallet-client");
const ethereumjs_util_1 = require("ethereumjs-util");
const util_1 = require("lqd-wallet-client/util");
const wallet_update_error_model_1 = require("lqd-wallet-client/models/state/wallet-update-error.model");
const logging_service_1 = require("../lqd-wallet-client-factory/logging.service");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const transaction_status_1 = __importDefault(require("../models/transaction-status"));
const fs = require("fs");
const config = JSON.parse(fs.readFileSync(`/code/config.json`));
function padWithZeroes(numb, length) {
    let myString = '' + numb;
    while (myString.length < length) {
        myString = '0' + myString;
    }
    return myString;
}
function concatSig(v, r, s) {
    const rSig = ethereumjs_util_1.fromSigned(r);
    const sSig = ethereumjs_util_1.fromSigned(s);
    const vSig = ethereumjs_util_1.bufferToInt(v);
    const rStr = util_1.remove0xPrefix(padWithZeroes(ethereumjs_util_1.bufferToHex(ethereumjs_util_1.toUnsigned(rSig)), 64));
    const sStr = util_1.remove0xPrefix(padWithZeroes(ethereumjs_util_1.bufferToHex(ethereumjs_util_1.toUnsigned(sSig)), 64));
    const vStr = util_1.remove0xPrefix(vSig.toString(16));
    return util_1.remove0xPrefix(rStr.concat(sStr).concat(vStr));
}
function signMessageRSV(data, privKey) {
    console.log('Signing message...', data);
    const message = ethereumjs_util_1.toBuffer(data);
    const msgHash = ethereumjs_util_1.hashPersonalMessage(message);
    const sig = ethereumjs_util_1.ecsign(msgHash, new Buffer(privKey.slice(2), 'hex'));
    return concatSig(sig.v, sig.r, sig.s);
}
function signMessageHubModel(data, privKey) {
    const sig = signMessageRSV(data, privKey);
    const pubkey = ethereumjs_util_1.toChecksumAddress(ethereumjs_util_1.bufferToHex(ethereumjs_util_1.privateToAddress(ethereumjs_util_1.toBuffer(privKey))));
    return lqd_wallet_client_1.Signature.fromRSV(pubkey, data, sig);
}
exports.signMessageHubModel = signMessageHubModel;
function transferDataToTransfer(isIncomingPending) {
    return (transferData) => {
        const transfer = new lqd_wallet_client_1.Transfer(transferData.wallet, transferData.round, transferData.amount, transferData.recipient, transferData.recipient_trail_identifier, null, transferData.nonce, transferData.id);
        if (isIncomingPending) {
            transfer.saveDebitAuthorization(transferData.sender_aggregate);
        }
        return transfer;
    };
}
function faucetSend(wallet, dest, privKey, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let preparedTransfer;
        try {
            preparedTransfer = yield lqdClient.prepareOutgoingTransfer(wallet, dest, new bignumber_js_1.default(amount));
        }
        catch (err) {
            console.log("Prepare transfer failed: ", err);
            return Promise.reject('Address not registred');
        }
        if (!preparedTransfer.transfer) {
            return Promise.reject('Failed to prepare transfer..');
        }
        const agreggSig = signMessageHubModel(preparedTransfer.hashes.aggregate, privKey);
        const markerSig = signMessageHubModel(preparedTransfer.hashes.marker, privKey);
        let resp;
        try {
            resp = yield lqdClient.sendOutgoingTransfer(wallet, preparedTransfer, agreggSig, markerSig);
        }
        catch (err) {
            console.log("sendOutgoingTransfer fialed: ", err);
            return Promise.reject('Unknown hub error');
        }
        console.log('Off-chain TX sent');
        return Promise.resolve();
    });
}
const validateReceipt = (state, timeout = 120) => __awaiter(this, void 0, void 0, function* () {
    console.log(`timeout: ${timeout}`);
    if (timeout === 0) {
        return false;
    }
    const confirmation = state.wallet.latestRound.aggregate.isTransferPending;
    console.log(`Is pending ${JSON.stringify(confirmation)}`);
    if (confirmation === false) {
        return true;
    }
    else {
        return yield (new Promise(resolve => {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                resolve(yield validateReceipt(state, timeout - 1));
            }), 1000);
        }));
    }
});
const PRIVATE_KEY = config.ETHEREUM_WALLET_PRIVATE_KEY;
let lqdClient = lqd_client_factory_1.LQDClientFactory(config.ETHEREUM_NODE_URL);
lqdClient.web3Service.rpc.eth.sign = function (accountAddress, data, callback) {
    callback(null, signMessageRSV(data, PRIVATE_KEY));
};
lqdClient.web3Service.rpc.personal.sign = null;
const address = ethereumjs_util_1.toChecksumAddress(ethereumjs_util_1.bufferToHex(ethereumjs_util_1.privateToAddress(ethereumjs_util_1.toBuffer(PRIVATE_KEY))));
console.log(`Wallet: ${address}`);
const clientWallet = new lqd_wallet_client_1.Wallet(address, parseInt(config.ETHEREUM_NETWORK_ID), config.HUB_CONTRACT_ADDRESS, config.HUB_PROVIDER_URL);
const paymentsMap = new Map();
let walletState;
lqdClient.walletStateSyncObservable.subscribe(next => {
    walletState = next;
    console.log('STATE!');
    console.log(next.updateError);
    clientWallet.lock.runExclusive(() => __awaiter(this, void 0, void 0, function* () {
        console.log('RUN!');
        const wallet = next.wallet;
        if (next.updateError === wallet_update_error_model_1.WalletUpdateError.UNREGISTERED_NO_REQUEST) {
            const digest = yield lqdClient.getAdmissionDigest(wallet);
            const authorization = lqd_wallet_client_1.Signature.fromRSV(address, digest, signMessageRSV(digest, PRIVATE_KEY));
            try {
                yield lqdClient.hubApiService.register(wallet, authorization);
                logging_service_1.LoggingService.log('registered');
            }
            catch (err) {
                logging_service_1.LoggingService.error('registration error');
            }
        }
        else if (!next.updateError) {
            if (wallet.latestRound.aggregate.pendingTransfer) {
                console.log('Pending transfer confirmation..');
            }
            else if (wallet.latestRound.pendingIncomingTransfers && wallet.latestRound.pendingIncomingTransfers.length > 0) {
                const transfer = transferDataToTransfer(true)(wallet.latestRound.pendingIncomingTransfers[0]);
                const receipt = lqd_wallet_client_1.LQDClient.prepareReceipt(wallet, transfer);
                const digest = receipt.hashes.aggregate;
                const sig = signMessageRSV(digest, PRIVATE_KEY);
                const authorization = lqd_wallet_client_1.Signature.fromRSV(address, digest, sig);
                try {
                    const sent = yield lqdClient.sendIncomingTransferReceipt(wallet, receipt, authorization);
                    if (!sent) {
                        logging_service_1.LoggingService.error('rejected receipt!');
                    }
                    else {
                        logging_service_1.LoggingService.error('receipt sent.. waiting for confirmation.');
                    }
                }
                catch (err) {
                    logging_service_1.LoggingService.error('error sending receipt');
                }
            }
            else {
                for (let i = wallet.registrationRound; i <= wallet.latestRound.roundNumber; i++) {
                    const round = wallet.getRound(i);
                    for (let tx of round.aggregate.transfers) {
                        if (!util_1.isSameHexValue(tx.recipient, address) || !tx.creditConfirmation) {
                            continue;
                        }
                        paymentsMap.set(tx.txId, {
                            nonce: tx.nonce,
                            amount: tx.amount.toFixed(0),
                            transactionId: tx.txId,
                            recipient: tx.recipient,
                            sender: tx.sender,
                            status: transaction_status_1.default.fromBoolean(typeof tx.creditConfirmation !== 'undefined')
                        });
                    }
                }
                const dump = JSON.stringify([...paymentsMap]);
                console.log(dump);
                fs.writeFile('./tx_dump.json', dump, (err) => {
                    if (err) {
                        return console.log(`ERROR: ${err}`);
                    }
                    console.log('Transfers dumped!');
                });
            }
        }
        else {
            logging_service_1.LoggingService.error(`CONTRACT STATE ${next.contractState}`);
            if (next.contractState) {
                logging_service_1.LoggingService.error(`ROUND: ${next.contractState.currentRound}`);
                logging_service_1.LoggingService.error(`SUB BLOCK: ${next.contractState.currentSubBlock}`);
                logging_service_1.LoggingService.error(`LAST SUBMISSION: ${next.contractState.lastSubmissionRound}`);
                logging_service_1.LoggingService.error(`EXTENDED SLACK: ${next.contractState.extendedSlackPeriod}`);
                logging_service_1.LoggingService.error(`SUBMITTED: ${next.contractState.isCheckpointSubmitted}`);
            }
            logging_service_1.LoggingService.error(`LATEST ROUND: ${wallet.latestRound.roundNumber}`);
            const merkleProofData = next.hubState.walletData.merkle_proofs.find((value) => value.round_number == wallet.latestRound.roundNumber);
            logging_service_1.LoggingService.error(`MERKLE PROOF ${merkleProofData}`);
        }
    }));
});
class LQDManager {
    static client() {
        return lqdClient;
    }
    static hubProvider() {
        return {
            networkId: config.ETHEREUM_NETWORK_ID,
            contract: config.HUB_CONTRACT_ADDRESS,
            url: config.HUB_PROVIDER_URL,
        };
    }
    static payments() {
        return [...paymentsMap.keys()].reduce((acc, key) => Object.defineProperty(acc, key, { value: paymentsMap.get(key), enumerable: true }), {});
    }
    static privateKey() {
        return config.ETHEREUM_WALLET_PRIVATE_KEY;
    }
    static start({ initialDelay = 250, period = 10000 }) {
        lqdClient.synchronizationPollService.startSynchronization(clientWallet, initialDelay, period);
    }
    static wallet() {
        return clientWallet;
    }
}
exports.default = LQDManager;
//# sourceMappingURL=lqd-client.js.map