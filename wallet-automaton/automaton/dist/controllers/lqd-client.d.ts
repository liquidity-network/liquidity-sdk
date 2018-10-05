export declare function signMessageHubModel(data: any, privKey: any): any;
export default class LQDManager {
    static client(): any;
    static hubProvider(): {
        networkId: any;
        contract: any;
        url: any;
    };
    static payments(): any;
    static privateKey(): any;
    static start({ initialDelay, period }: {
        initialDelay?: number;
        period?: number;
    }): void;
    static wallet(): any;
}
