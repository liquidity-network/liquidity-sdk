const invoiceFactory = require('liquidity-invoice-generation')
const qrcode = require('qrcode')
const request = require('request-promise-native')

const config = {
    automatonUrl: 'http://localhost:3600',
    pollingInterval: 3000,
}

module.exports = {
    transfers: {
        send: async (recipient, amount) => {
            const res = await request
                .post(`${config.automatonUrl}/transfers/send`)
                .form({
                    recipient: recipient,
                    amount: amount,
                })
            return res.body
        },
        list: async (filters) => {
            const query = Object.keys(filters)
                .map(name => `${name}=${filters[name]}`)
                .join('&')
            const res = await request
                .get(`${config.automatonUrl}/transfers/list?${query}`)
            return res.body
        },
        watch: () => {
        }
    },
    invoices: {
        generate: async (amount, recipient, details, currency) => {
            const data = {amount: amount}
            if (typeof recipient !== 'undefined') data.recipient = recipient
            if (typeof details !== 'undefined') data.details = details
            if (typeof currency !== 'undefined') data.currency = currency
            const res = await request
                .post(`${config.automatonUrl}/invoices/generate`)
                .form(data)
            return res.body
        },
        list: async (filters) => {
            const query = Object.keys(filters)
                .map(name => `${name}=${filters[name]}`)
                .join('&')
            const res = await request
                .get(`${config.automatonUrl}/invoices/list?${query}`)
            return res.body
        },
        qrcode: (filename, invoice) => {
            const data = invoiceFactory.encodeInvoice(invoice.invoice)
            qrcode.toFile(filename, data, { width: 300 }, function (err) {})
        }
    },
    wallet: {
        information: async () => {
            const res = await request
                .get(`${config.automatonUrl}/wallet/information`)
            return res.body
        }
    },
    hub: {
        wallets: async () => {
            const res = await request
                .get(`${config.automatonUrl}/hub/wallets`)
            return res.body
        },
        audit: (address) => {
            return {
                registration: async () => {
                    const res = await request
                        .get(`${config.automatonUrl}/hub/${address}/registration`)
                    return res.body
                },
                transfers: async () => {
                    const res = await request
                        .get(`${config.automatonUrl}/hub/${address}/transfers`)
                    return res.body
                },
                deposits: async () => {
                    const res = await request
                        .get(`${config.automatonUrl}/hub/${address}/deposits`)
                    return res.body
                },
            }
        }
    },
    config: {
        automatonUrl: (url) => {
            config.automatonUrl = url
        },
        pollingInterval: (interval) => {
            config.pollingInterval = interval
        },
        set: (newConfig) =>
            Object.keys(newConfig)
                .map(key => config[key] = newConfig[key])
    }
}