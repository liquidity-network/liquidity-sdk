.. _header-n9182:

Wallet
------

Wallet endpoint provides all informations related to the current state
of the automaton.

.. _header-n9183:

Information
~~~~~~~~~~~

Retrieve all information about the wallet managed by the automaton.

.. _header-n9185:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /wallet/information

.. highlight:: none

.. _header-n9187:

Request
^^^^^^^

+------+----------+-------------+---------------+---------+
| Name | Required | Description | Default Value | Example |
+======+==========+=============+===============+=========+
|      |          |             |               |         |
+------+----------+-------------+---------------+---------+

.. _header-n9201:

Response
^^^^^^^^

+------------------------+-------------+-------------+-------------+----------------------------------------------+
| Name                   | Required    | Description | Default     | Example                                      |
|                        |             |             | Value       |                                              |
+========================+=============+=============+=============+==============================================+
| ``address``            | required    | SDK's       |             | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|                        |             | ethereum    |             |                                              |
|                        |             | address     |             |                                              |
|                        |             |             |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``ethereumNodeUrl``    | required    | Ethereum    |             | *https://mainnet.infura.io/*                 |
|                        |             | node SDK is |             |                                              |
|                        |             | connected   |             |                                              |
|                        |             | to          |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``ethereumNetworkId``  | required    | Network id  |             | *1*                                          |
|                        |             | seen by SDK |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``hubContractAddress`` | required    | Liquidity   |             | *0xac8c3D5242b425DE1b86b17E407D8E949D994010* |
|                        |             | Hub         |             |                                              |
|                        |             | contract    |             |                                              |
|                        |             | SDK is      |             |                                              |
|                        |             | connected   |             |                                              |
|                        |             | to          |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``hubProviderUrl``     | required    | Liquidity   |             | *https://beta.liquidity.network*             |
|                        |             | Hub host    |             |                                              |
|                        |             | SDK is      |             |                                              |
|                        |             | connected   |             |                                              |
|                        |             | to          |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``amount``             | required    | Amount SDK  |             | *1000000000000000000*                        |
|                        |             | manages     |             |                                              |
|                        |             | off-chain   |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+
| ``onchain``            | required    | On-chain    |             | *{ amount: 0 }*                              |
|                        |             | information |             |                                              |
|                        |             | managed by  |             |                                              |
|                        |             | the SDK     |             |                                              |
+------------------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9251:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /wallet/information

.. highlight:: none

.. highlight:: json
.. code:: json

   {
       "address": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
       "ethereumNodeUrl": "https://mainnet.infura.io/",
       "ethereumNetworkId": 1,
       "hubContractAddress": "0xac8c3D5242b425DE1b86b17E407D8E949D994010",
       "hubProviderUrl": "https://beta.liquidity.network",
       "amount": "1",
       "onchain": {
           "amount": "0"
       }
   }

.. highlight:: none
