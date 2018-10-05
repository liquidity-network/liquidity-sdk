"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_status_1 = __importDefault(require("./transaction-status"));
class Filter {
    constructor(args) {
        this.count = args.count;
        this.recipient = args.recipient;
        this.sender = args.count;
        this.amount = args.count;
        this.nonce = args.count;
        this.status = transaction_status_1.default.fromString(args.status);
        this.nonce = args.count;
    }
}
exports.default = Filter;
//# sourceMappingURL=filter.js.map