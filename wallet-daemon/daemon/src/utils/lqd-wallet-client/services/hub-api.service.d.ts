import { RestApiInterface } from "../interfaces/rest-api.interface";
import { Transfer } from "../models/transactions/transfer.model";
import { Wallet } from "../models/wallet/wallet.model";
import { HubStatusDataInterface, HubTokensListDataInterface, OrderBookDataInterface, RegistrationDataInterface, SLADetailsInterface, SLAStatusInterface, TransferDataInterface, WalletDataInterface } from "../interfaces/data.interface";
import { Signature } from "../models/primitives/signature.model";
export declare class HubApiService {
    private api;
    constructor(api: RestApiInterface);
    getStatusData(webAddress: string): Promise<HubStatusDataInterface>;
    getTokensList(webAddress: string): Promise<HubTokensListDataInterface>;
    getWalletData(wallet: Wallet, roundNumber?: number, transferId?: number): Promise<WalletDataInterface>;
    whoisWallet(tokenAddress: string, address: string, webAddress: string): Promise<RegistrationDataInterface>;
    getRoundTransfers(wallet: Wallet, recipient: string, round: number): Promise<any>;
    getTransfers(wallet: Wallet, recipient: string): Promise<any>;
    getSwapOrders(wallet: Wallet, leftToken: string, rightToken: string, roundNumber: number): Promise<OrderBookDataInterface>;
    register(wallet: Wallet, authorization: Signature): Promise<any>;
    getSLADetails(wallet: Wallet): Promise<SLADetailsInterface>;
    getSLAStatus(wallet: Wallet): Promise<SLAStatusInterface>;
    sendTransfer(wallet: Wallet, transfer: Transfer, signature: Signature, balance_signature: Signature): Promise<TransferDataInterface>;
    sendSwap(senderWallet: Wallet, recipientWallet: Wallet, swap: Transfer, senderAggregateSignature: Signature, recipientAggregateSignature: Signature, fulfillmentAggregateSignature: Signature, balanceSignature: Signature): Promise<TransferDataInterface>;
    sendSwapFreeze(wallet: Wallet, swap: Transfer, freezeSignature: Signature): Promise<any>;
    sendSwapCancellation(wallet: Wallet, swap: Transfer, senderCancellationSignature: Signature, recipientCancellationSignature: Signature): Promise<any>;
    sendSwapFinalization(wallet: Wallet, swap: Transfer, finalizationSignature: Signature): Promise<any>;
    sendReceipt(wallet: Wallet, id: number, signature: Signature): Promise<any>;
}
