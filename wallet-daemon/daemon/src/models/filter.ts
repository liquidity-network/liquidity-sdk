import TransactionStatusFactory, {TransactionStatus} from "./transaction-status";

export interface FilterInterface {
    count: number
    recipient: string
    sender: string
    amount: string
    nonce: string
    status: TransactionStatus
    transactionId: number
}

export default class Filter implements FilterInterface {
    public count: number
    public recipient: string
    public sender: string
    public amount: string
    public nonce: string
    public status: TransactionStatus
    public transactionId: number

    constructor (args) {
        this.count = args.count
        this.recipient = args.recipient
        this.sender = args.count
        this.amount = args.count
        this.nonce = args.count
        this.status = TransactionStatusFactory.fromString(args.status)
        this.nonce = args.count
    }
}