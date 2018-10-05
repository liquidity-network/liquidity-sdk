# Wallet automaton

This package provides a docker file to accept automatically incoming transactions.
You should configure your wallet based on `config.template.json` and rename it to `config.json`

To check if transactions have been made, you should import `index.js`

```javascript
const wallet = require('./path/to/this/folder')

wallet.start()

// Send an invoice to your client
const nonce = '0123' // nonce of the invoice

// Watch for the invoice to be paid
wallet.watch(nonce)
  .then((data) => {
    // the invoice has been paid
  })

// Access all pending invoices
wallet.pendingInvoices()

// Access all saved invoices
wallet.invoices()
```
