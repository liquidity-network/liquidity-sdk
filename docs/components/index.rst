
.. _header-n8742:

Liquidity SDK
-------------

Liquidity SDK facilitates the easy integration of off-chain payments and exchange within your application and is divided into two parts. Firstly, the wallet automaton which is a self-hosted liquidity wallet management tool for your transactions. Secondly, the Liquidity language library that allows you to access wallet automaton directly from your favourite language or from REST endpoints.

.. image:: components_diagram.svg

.. _header-n8746:

Architecture
~~~~~~~~~~~~

Liquidity is built around hubs that create a link between the blockchain and off-chain transaction ecosystems. The blockchain remains the ultimate source of trust in the case of conflict while the hub manages the off-chain state of network participants. To leverage the complexity of an active state management, the wallet automaton queries the hub to obtain its last state. It provides the up-to-date state through REST endpoint that the language library is using.

To provide a concrete example, the flow to perform a full transfer of
*32 wei* to a specific user is given below. Language Library is
considered to be the end user.

.. image:: sequence_transfer.svg

1. The user asks the automaton to perform a transfer of 32 wei

2. The automaton creates the transfer

3. The automaton sends the transfer

4. At regular intervals, the automaton checks if the hub has included the
   transfer

5. When the transfer is included in an update, the automaton recognises it

6. When the user checks if there is a pending transfer, no notice is
   received because the transfer has been performed

If the process fails at any point, the user is able to
contact the automaton and perform the security associated operations.

.. _header-n8764:

Wallet automaton
~~~~~~~~~~~~~~~~

Liquidity network is a non-custodian payment system. The core component being the wallet automaton through which the user can perform operations on the network while remaining in control of their funds, making the end user the custodian. For applications looking to implement off-chain payments, this component handles communication with the liquidity hub, ensuring it behaves correctly.

In terms of technology, the automaton is a docker container that synchronises with the hub and provides various endpoints. All endpoints use the internal state of the automaton. The automaton is hosted by the user and has knowledge of their private key, therefore it is able to sign off-chain transfers and leverage the complex verification process that takes place.

.. _header-n8768:

Language library
~~~~~~~~~~~~~~~~

Liquidity language library is a convenient way to communicate with the automaton. It wraps the provided REST API using language specific features. For now, the language library is only available for Node.JS. If you have built an implementation for your preferred language, you can submit an issue on liquidity SDK
repo <https://github.com/liquidity-network/liquidity-sdk>`__.

In the transfer sequence described above, the user has to call on the automaton regularly in order to ascertain if there are any transfers pending. This active wait is not convenient and doesn’t integrate well within an application flow. To leverage it, Node.JS library has created a transfer method that returns a promise which is resolved when the transfer has been performed.

.. highlight:: javascript
.. code:: javascript

   const liquidity = require('liquidity-sdk')

   const to = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
   const amount = 32

   const performedTransfer = await liquidity.transfers.send(to, amount)

   console.log(`Tranfer has been ${performedTranfer}`)
.. highlight:: none
