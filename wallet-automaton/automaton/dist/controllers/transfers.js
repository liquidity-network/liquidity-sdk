"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_status_1 = require("../models/transaction-status");
const lqd_client_1 = __importStar(require("./lqd-client"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class Transfers {
    static list(filters) {
        filters.sender = (typeof filters.sender === 'undefined') ? lqd_client_1.default.wallet().address : filters.sender;
        filters.status = (typeof filters.status === 'undefined') ? transaction_status_1.TransactionStatus.CONFIRMED : filters.status;
        filters.count = (typeof filters.count === 'undefined') ? 100 : filters.count;
        const payments = lqd_client_1.default.payments();
        console.log(payments, filters);
        return Object.keys(payments)
            .filter(key => {
            const payment = payments[key];
            return (typeof filters.nonce !== 'undefined' && filters.nonce === payment.nonce) ||
                (typeof filters.transactionId !== 'undefined' && filters.transactionId === payment.transactionId) ||
                (typeof filters.recipient !== 'undefined' && filters.recipient === payment.recipient) ||
                (typeof filters.sender !== 'undefined' && filters.sender === payment.sender) ||
                (typeof filters.amount !== 'undefined' && filters.amount === payment.amount) ||
                (typeof filters.status !== 'undefined' && filters.status === payment.status);
        })
            .slice(0, filters.count)
            .map(key => payments[key]);
    }
    static send(recipient, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = lqd_client_1.default.wallet();
            const privateKey = lqd_client_1.default.privateKey();
            let preparedTransfer;
            try {
                preparedTransfer = yield lqd_client_1.default.client().prepareOutgoingTransfer(wallet, recipient, new bignumber_js_1.default(amount));
            }
            catch (err) {
                console.log("Prepare transfer failed: ", err);
                return Promise.reject('Address not registred');
            }
            if (!preparedTransfer.transfer) {
                return Promise.reject('Failed to prepare transfer..');
            }
            const agreggSig = lqd_client_1.signMessageHubModel(preparedTransfer.hashes.aggregate, privateKey);
            const markerSig = lqd_client_1.signMessageHubModel(preparedTransfer.hashes.marker, privateKey);
            let resp;
            try {
                resp = yield lqd_client_1.default.client().sendOutgoingTransfer(wallet, preparedTransfer, agreggSig, markerSig);
            }
            catch (err) {
                console.log("sendOutgoingTransfer fialed: ", err);
                return Promise.reject('Unknown hub error');
            }
            console.log('Off-chain TX sent');
            console.log(preparedTransfer);
            return Promise.resolve({
                sender: wallet.address,
                recipient: recipient,
                amount: amount,
                created_on: (new Date()).toISOString(),
                nonce: 1,
                transactionId: 1,
                status: transaction_status_1.TransactionStatus.CONFIRMED
            });
        });
    }
}
exports.Transfers = Transfers;
//# sourceMappingURL=transfers.js.map