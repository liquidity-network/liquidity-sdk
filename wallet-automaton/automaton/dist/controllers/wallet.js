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
const lqd_client_1 = __importDefault(require("./lqd-client"));
class Wallet {
    static information() {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = lqd_client_1.default.client().web3Service.rpc;
            const wallet = lqd_client_1.default.wallet();
            const hub = lqd_client_1.default.hubProvider();
            return {
                address: wallet.address,
                ethereumNodeUrl: hub.networkId,
                hubContractAddress: hub.contract,
                hubProviderUrl: hub.url,
                amount: wallet.withdrawableAmount.toFixed(0),
                onchain: {
                    amount: web3.fromWei(yield web3.eth.getBalance(wallet.address))
                },
            };
        });
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map