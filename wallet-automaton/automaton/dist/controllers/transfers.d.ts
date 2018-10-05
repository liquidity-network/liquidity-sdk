import Filter from "../models/filter";
import { TransactionStatus } from "../models/transaction-status";
export declare class Transfers {
    static list(filters: Filter): any[];
    static send(recipient: any, amount: any): Promise<{
        sender: any;
        recipient: any;
        amount: any;
        created_on: string;
        nonce: number;
        transactionId: number;
        status: TransactionStatus;
    }>;
}
