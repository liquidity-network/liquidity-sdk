export enum TransactionStatus {
    CONFIRMED = 'confirmed',
    PENDING = 'pending',
}

const reverse = [
    TransactionStatus.CONFIRMED,
    TransactionStatus.PENDING
].reduce((acc, status) =>
    Object.defineProperty(acc, status.toString(), {value: status, enumerable: true}),
    {}
)

export default class TransactionStatusFactory {
    public static fromBoolean(t: boolean) {
        return t ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING
    }

    public static fromString(t: string) {
        const index = Object.keys(reverse).indexOf(t)
        if (index !== -1) {
            return reverse[index]
        }
        return undefined
    }
}