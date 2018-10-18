import { TransactionStatus } from "./transaction-status";
export interface FilterInterface {
    count: number;
    recipient: string;
    sender: string;
    amount: string;
    nonce: string;
    status: TransactionStatus;
    transactionId: number;
}
export default class Filter implements FilterInterface {
    count: number;
    recipient: string;
    sender: string;
    amount: string;
    nonce: string;
    status: TransactionStatus;
    transactionId: number;
    constructor(args: any);
}
