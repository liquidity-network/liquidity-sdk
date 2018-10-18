import Filter from "../models/filter"
import {TransactionStatus} from "../models/transaction-status"
import LqdClient, {signMessageHubModel} from "./lqd-client"
import BigNumber from "bignumber.js"

export class Transfers {

    public static list(filters: Filter) {
        filters.sender = (typeof filters.sender === 'undefined') ? LqdClient.wallet().address : filters.sender
        filters.status = (typeof filters.status === 'undefined') ? TransactionStatus.CONFIRMED : filters.status
        filters.count = (typeof filters.count === 'undefined') ? 100 : filters.count
        const payments = LqdClient.payments()
        console.log(payments, filters)
        return Object.keys(payments)
            .filter(key => {
                const payment = payments[key]
                return (typeof filters.nonce !== 'undefined' && filters.nonce === payment.nonce) ||
                    (typeof filters.transactionId !== 'undefined' && filters.transactionId === payment.transactionId) ||
                    (typeof filters.recipient !== 'undefined' && filters.recipient === payment.recipient) ||
                    (typeof filters.sender !== 'undefined' && filters.sender === payment.sender) ||
                    (typeof filters.amount !== 'undefined' && filters.amount === payment.amount) ||
                    (typeof filters.status !== 'undefined' && filters.status === payment.status)
            })
            .slice(0, filters.count)
            .map(key => payments[key])
    }

    public static async send(recipient, amount) {
        const wallet = LqdClient.wallet()
        const privateKey = LqdClient.privateKey()
        let preparedTransfer
        try {
            preparedTransfer = await LqdClient.client().prepareOutgoingTransfer(
                wallet,
                recipient,
                new BigNumber(amount)
            )
        } catch (err) {
            console.log("Prepare transfer failed: ", err)
            return Promise.reject('Address not registred')
        }

        if (!preparedTransfer.transfer) {
            return Promise.reject('Failed to prepare transfer..')
        }

        const agreggSig = signMessageHubModel(
            preparedTransfer.hashes.aggregate,
            privateKey
        )
        const markerSig = signMessageHubModel(
            preparedTransfer.hashes.marker,
            privateKey
        )

        let resp
        try {
            resp = await LqdClient.client().sendOutgoingTransfer(
                wallet,
                preparedTransfer,
                agreggSig,
                markerSig
            )
        } catch (err) {
            console.log("sendOutgoingTransfer fialed: ", err)
            return Promise.reject('Unknown hub error')
        }

        console.log('Off-chain TX sent')

        console.log(preparedTransfer)
        return Promise.resolve({
            sender: wallet.address,
            recipient: recipient,
            amount: amount,
            created_on: (new Date()).toISOString(),
            nonce: 1,
            transactionId: 1,
            status: TransactionStatus.CONFIRMED
        })
    }
}