import LqdClient from "./lqd-client"

export default class Wallet {
    public static async information () {
        const web3 = LqdClient.client().web3Service.rpc
        const wallet = LqdClient.wallet()
        const hub = LqdClient.hubProvider()

        return {
            address: wallet.address,
            ethereumNodeUrl: hub.networkId,
            hubContractAddress: hub.contract,
            hubProviderUrl: hub.url,
            amount: wallet.withdrawableAmount.toFixed(0),
            onchain: {
                amount: web3.fromWei(await web3.eth.getBalance(wallet.address))
            },
        }
    }
}