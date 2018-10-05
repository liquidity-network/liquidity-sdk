export declare enum TransactionStatus {
    CONFIRMED = "confirmed",
    PENDING = "pending"
}
export default class TransactionStatusFactory {
    static fromBoolean(t: boolean): TransactionStatus;
    static fromString(t: string): any;
}
