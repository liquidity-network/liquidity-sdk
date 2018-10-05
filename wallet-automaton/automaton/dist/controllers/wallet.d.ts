export default class Wallet {
    static information(): Promise<{
        address: any;
        ethereumNodeUrl: any;
        hubContractAddress: any;
        hubProviderUrl: any;
        amount: any;
        onchain: {
            amount: any;
        };
    }>;
}
