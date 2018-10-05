"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["CONFIRMED"] = "confirmed";
    TransactionStatus["PENDING"] = "pending";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
const reverse = [
    TransactionStatus.CONFIRMED,
    TransactionStatus.PENDING
].reduce((acc, status) => Object.defineProperty(acc, status.toString(), { value: status, enumerable: true }), {});
class TransactionStatusFactory {
    static fromBoolean(t) {
        return t ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING;
    }
    static fromString(t) {
        const index = Object.keys(reverse).indexOf(t);
        if (index !== -1) {
            return reverse[index];
        }
        return undefined;
    }
}
exports.default = TransactionStatusFactory;
//# sourceMappingURL=transaction-status.js.map