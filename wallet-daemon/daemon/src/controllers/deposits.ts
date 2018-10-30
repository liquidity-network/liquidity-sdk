import LqdClient from "./lqd-client"
import BigNumber from "bignumber.js"

export class Deposits {
    public static async send(amount) {
        const reg = /^\d+$/;

        if(!reg.test(amount)){
          return Promise.resolve({
            error: "Invalid input, amount should be an integer"
          });
        }

        const wallet = LqdClient.wallet();
        amount = new BigNumber(amount);

        let resp;
        try{
          let methodData = LqdClient.client().contractApiService
          .getABI(wallet.contractAddress)
          .deposit.getData(
            wallet.tokenAddress,
            wallet.address,
            amount.toFixed(0),
          );

          let rawTx = {
            data: methodData,
            value: '0x' + amount.toString(16),
          };

          resp = await LqdClient.sendRawTransaction(rawTx);

        }catch(err){
          return Promise.resolve({
            error: err.message
          });
        };

        return Promise.resolve({
          amount: amount.toFixed(0),
          tx_hash: resp
        });
    }

}
