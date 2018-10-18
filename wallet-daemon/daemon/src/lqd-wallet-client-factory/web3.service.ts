import {injectable} from "inversify";
import {Web3ServiceInterface} from 'lqd-wallet-client';
import {Web3ServiceConstructor} from "lqd-wallet-client/interfaces/web3-service.interface";

declare var require: any;


export function Web3ServiceFactory(providerUrl: string): Web3ServiceConstructor {
    @injectable() class Web3Service implements Web3ServiceInterface {

        public static Web3 = require('web3');

        private web3 = new Web3Service.Web3(
            new Web3Service.Web3.providers.HttpProvider(providerUrl));

        get rpc() {
            return this.web3;
        }

        get isConnected(): boolean {
            return (typeof this.web3 !== 'undefined') && this.web3.isConnected();
        }

        get accounts(): string[] {
            return this.isConnected
                ? this.web3.eth.accounts.map((address) => this.web3.toChecksumAddress(address))
                : [];
        }
    }

    return Web3Service;
}