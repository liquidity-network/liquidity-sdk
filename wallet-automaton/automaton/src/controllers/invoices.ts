import LqdClient from './lqd-client'
import LqdInvoice from 'liquidity-invoice-generation'
import * as fs from 'fs'
import Filter from '../models/filter'
import {Transfers} from "./transfers";

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
    fs.writeFile(file, invoices, (err) => {
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
        return Transfers.list(filters)
            .filter(transfer =>
                typeof invoices[transfer.nonce] !== 'undefined'
            )
    }
}