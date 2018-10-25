import LqdClient from './lqd-client'
import LqdInvoice from 'liquidity-invoice-generation'
import * as fs from 'fs'
import Filter from '../models/filter'
import {Transfers} from "./transfers";
import TransactionStatusFactory, {TransactionStatus} from "../models/transaction-status";

const invoicesFile = `./invoices.json`
let invoices = undefined

const redirectionService = 'https://lqd.money'

const restoreInvoices = (file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err && err.errno !== -2) {
            invoices = {}
        } else {
            try {
                invoices = JSON.parse(data)
            } catch (err) {
                invoices = {}
            }
        }
    })
}

restoreInvoices(invoicesFile)

const saveInvoices = async (file) => {
    fs.writeFile(file, JSON.stringify(invoices), (err) => {
        if (err) {
            return console.log(`ERROR: ${err}`);
        }
        console.log('Invoices saved')
    })
}

const addInvoice = (invoice) => {
    invoices[invoice.nonce] = invoice
    saveInvoices(invoicesFile)
}

export default class Invoices {
    public static generate(amount, details, currency) {
        let invoice = LqdInvoice.createInvoice(
            {
                publicKey: LqdClient.wallet().address,
                networkId: LqdClient.hubProvider().networkId,
                hubAddress: LqdClient.hubProvider().contract,
            },
            amount,
            details,
            currency,
        )
        const encoded = LqdInvoice.encodeInvoice(invoice.invoice)
        invoice.invoice.nonce = invoice.nonce
        invoice = invoice.invoice
        invoice.amount = invoice.amount.toFixed(0)
        invoice.encoded = {
            url: `${redirectionService}/?data=${encoded}`,
            raw: encoded,
        }
        addInvoice(invoice)
        return invoice
    }

    public static list(filters: Filter) {
        filters.sender = (typeof filters.sender === 'undefined') ? LqdClient.wallet().address : filters.sender
        filters.status = (typeof filters.status === 'undefined') ? TransactionStatus.CONFIRMED : filters.status
        filters.count = (typeof filters.count === 'undefined') ? 100 : filters.count

        const executed = Transfers.list(filters)
            .filter(transfer =>
                typeof invoices[transfer.nonce] !== 'undefined'
            ).map(transfer =>
                invoices[transfer.nonce]
            )

        // TODO: proper filtering
        // to be added: transactionId, sender
        return Object.keys(invoices)
            .map(key => {
                const invoice = invoices[key]
                invoice.status = TransactionStatusFactory.fromBoolean(executed.indexOf(invoice) >= 0)
                return invoice
            })
            .filter(invoice => {
                return (typeof filters.nonce !== 'undefined' && filters.nonce === invoice.nonce) ||
                    (typeof filters.recipient !== 'undefined' && invoice.destinations.walletAddresses.indexOf(filters.recipient) >= 0) ||
                    (typeof filters.amount !== 'undefined' && filters.amount === invoice.amount) ||
                    true
            })
            .slice(0, filters.count)
            .reduce((acc, invoice) => {
                return Object.defineProperty(acc, invoice.nonce, {value: invoice, enumerable: true})
            }, {})
    }
}