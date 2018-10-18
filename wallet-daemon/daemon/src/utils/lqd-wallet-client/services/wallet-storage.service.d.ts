import { StorageManagerInterface } from "../interfaces/storage-manager.interface";
import { Wallet } from "../models/wallet/wallet.model";
import { WalletMetadataInterface } from "../interfaces/data.interface";
export declare class WalletStorageService {
    private storage;
    private static INDEX_KEY;
    constructor(storage: StorageManagerInterface);
    saveWallet(wallet: Wallet): boolean;
    loadWallet(walletAddress: string, networkId: number, contractAddress: string, tokenAddress: string): Wallet;
    wallets(): Map<string, WalletMetadataInterface>;
    private addToIndex(wallet);
    private removeFromIndex(wallet);
    static walletInstanceKey(wallet: Wallet): string;
    static walletKey(walletAddress: string, networkId: number, contractAddress: string, tokenAddress: string): string;
}
