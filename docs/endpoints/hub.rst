
.. _header-n9255:

Hub
---

in your ``config.json`` file, you have specified a ``HUB_PROVIDER_URL``.
This url is how the automaton communicates and retrieve information
stored on the hub. Hub endpoints are exposed trough this category and
allows the user to get low level information.

.. _header-n9257:

Wallets
~~~~~~~

List all wallets registered on associated liquidity hub.

.. _header-n9259:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/wallets

.. highlight:: none

.. _header-n9261:

Request
^^^^^^^

+------+----------+-------------+---------------+---------+
| Name | Required | Description | Default Value | Example |
+======+==========+=============+===============+=========+
|      |          |             |               |         |
+------+----------+-------------+---------------+---------+

.. _header-n9275:

Response
^^^^^^^^

Array

+-------------+-------------+-------------+-------------+--------------------------------------------+
| Name        | Required    | Description | Default     | Example                                    |
|             |             |             | Value       |                                            |
+=============+=============+=============+=============+============================================+
| ``address`` | required    | Liquidity   |             | *627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|             |             | registered  |             |                                            |
|             |             | ethereum    |             |                                            |
|             |             | address     |             |                                            |
|             |             | without     |             |                                            |
|             |             | prepending  |             |                                            |
|             |             | *0x*        |             |                                            |
+-------------+-------------+-------------+-------------+--------------------------------------------+

.. _header-n9290:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/wallets

.. highlight:: none

.. highlight:: json
.. code:: json

   [
       {
           "address": "627306090abaB3A6e1400e9345bC60c78a8BEf57",
       },
   ]


.. highlight:: none

.. _header-n9294:

Audit Registration
~~~~~~~~~~~~~~~~~~

For a specific ``:address``, get information about its registration.

.. _header-n9296:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/:address/registration

.. highlight:: none

.. _header-n9298:

Request
^^^^^^^

+-------------+-------------+-------------+-------------+----------------------------------------------+
| Name        | Required    | Description | Default     | Example                                      |
|             |             |             | Value       |                                              |
+=============+=============+=============+=============+==============================================+
| ``address`` | required    | Liquidity   | SDK's       | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|             |             | registered  | ethereum    |                                              |
|             |             | ethereum    | address     |                                              |
|             |             | address     |             |                                              |
+-------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9312:

Response
^^^^^^^^

+----------------------+-------------+-------------+-------------+--------------------------------------------------------------------------------------------------------------------------------------+
| Name                 | Required    | Description | Default     | Example                                                                                                                              |
|                      |             |             | Value       |                                                                                                                                      |
+======================+=============+=============+=============+======================================================================================================================================+
| ``round``            | required    | Round the   |             | *4*                                                                                                                                  |
|                      |             | wallet was  |             |                                                                                                                                      |
|                      |             | registered  |             |                                                                                                                                      |
+----------------------+-------------+-------------+-------------+--------------------------------------------------------------------------------------------------------------------------------------+
| ``wallet_signature`` | required    | Wallet      |             | *691550b1480f09d50789777d176323f9c4c13a0817263f063d35986ce940086d398517571e68511025800f94789faf6331d93b8af8698546e25f850ceceffb711b* |
|                      |             | signature   |             |                                                                                                                                      |
|                      |             | on          |             |                                                                                                                                      |
|                      |             | registratio |             |                                                                                                                                      |
|                      |             | n           |             |                                                                                                                                      |
+----------------------+-------------+-------------+-------------+--------------------------------------------------------------------------------------------------------------------------------------+
| ``hub_signature``    | required    | Hub         |             | *7795d1f7314bbbbf8a4144a7343ce413d5640099d889093270909e34b21e55f12956b66cf786da22e0c3774ffe72b107812ed3cddae35dc488705b1a736a2c401b* |
|                      |             | signature   |             |                                                                                                                                      |
|                      |             | on          |             |                                                                                                                                      |
|                      |             | registratio |             |                                                                                                                                      |
|                      |             | n           |             |                                                                                                                                      |
+----------------------+-------------+-------------+-------------+--------------------------------------------------------------------------------------------------------------------------------------+

.. _header-n9338:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/0x627306090abaB3A6e1400e9345bC60c78a8BEf57/registration

.. highlight:: none

.. highlight:: json
.. code:: json

   {
       "round": 4,
       "wallet_signature": "691550b1480f09d50789777d176323f9c4c13a0817263f063d35986ce940086d398517571e68511025800f94789faf6331d93b8af8698546e25f850ceceffb711b",
       "hub_signature": "7795d1f7314bbbbf8a4144a7343ce413d5640099d889093270909e34b21e55f12956b66cf786da22e0c3774ffe72b107812ed3cddae35dc488705b1a736a2c401b"
   }

.. highlight:: none

.. _header-n9342:

Audit Transfers
~~~~~~~~~~~~~~~

For a specific ``:address``, get information about its transfers.

.. _header-n9344:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/:address/transfers

.. highlight:: none

.. _header-n9346:

Request
^^^^^^^

+-------------+-------------+-------------+-------------+-------------+
| Name        | Required    | Description | Default     | Example     |
|             |             |             | Value       |             |
+=============+=============+=============+=============+=============+
| ``address`` | required    | Liquidity   | SDK's       | *0x62730609 |
|             |             | registered  | ethereum    | 0abaB3A6e14 |
|             |             | ethereum    | address     | 00e9345bC60 |
|             |             | address     |             | c78a8BEf57* |
+-------------+-------------+-------------+-------------+-------------+

.. _header-n9360:

Response
^^^^^^^^

Array

+-------------------+-------------+-------------+-------------+----------------------------------------------+
| Name              | Required    | Description | Default     | Example                                      |
|                   |             |             | Value       |                                              |
+===================+=============+=============+=============+==============================================+
| ``recipient``     | required    | Ethereum    |             | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|                   |             | address to  |             |                                              |
|                   |             | sent the    |             |                                              |
|                   |             | transaction |             |                                              |
|                   |             | to          |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``sender``        | required    | Ethereum    | SDK's       | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|                   |             | address     | ethereum    |                                              |
|                   |             | used to     | address     |                                              |
|                   |             | perform the |             |                                              |
|                   |             | transaction |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``amount``        | required    | Amount      |             | *1000000000000000000*                        |
|                   |             | transfered  |             |                                              |
|                   |             | in *wei*    |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``transactionId`` | required    | Unique      |             | *1*                                          |
|                   |             | identifier  |             |                                              |
|                   |             | of the      |             |                                              |
|                   |             | transaction |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``status``        | required    | Status of   |             | *confirmed,                                  |
|                   |             | the         |             | pending*                                     |
|                   |             | transaction |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``nonce``         | required    | Identifier  |             | *1270040570*                                 |
|                   |             | generated   |             |                                              |
|                   |             | from        |             |                                              |
|                   |             | transaction |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+
| ``round``         | required    | Round the   |             | *4*                                          |
|                   |             | transaction |             |                                              |
|                   |             | was         |             |                                              |
|                   |             | performed   |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9411:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/0x627306090abaB3A6e1400e9345bC60c78a8BEf57/transfers

.. highlight:: none

.. highlight:: json
.. code:: json

   [
       {
           "transactionId": "38",
           "round": 4,
           "recipient": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
           "sender": "0xd977dA63d086d222EDE0aa68ee84328310485FFE",
           "amount": "50000",
           "nonce": "1270040570",
       }
   ]

.. highlight:: none

.. _header-n9415:

Audit Deposits
~~~~~~~~~~~~~~

For a specific ``:address``, get information about its deposits.

.. _header-n9417:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/:address/deposits

.. highlight:: none

.. _header-n9419:

Request
^^^^^^^

+-------------+-------------+-------------+-------------+----------------------------------------------+
| Name        | Required    | Description | Default     | Example                                      |
|             |             |             | Value       |                                              |
+=============+=============+=============+=============+==============================================+
| ``address`` | required    | Liquidity   | SDK's       | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|             |             | registered  | ethereum    |                                              |
|             |             | ethereum    | address     |                                              |
|             |             | address     |             |                                              |
+-------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9433:

Response
^^^^^^^^

+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+
| Name              | Required    | Description | Default     | Example                                                            |
|                   |             |             | Value       |                                                                    |
+===================+=============+=============+=============+====================================================================+
| ``transactionId`` | required    | Transaction |             | *ee456c4f5f31e9b44c94df251690469fef4cf1c2b8f603edc62d7703acda098c* |
|                   |             | id of the   |             |                                                                    |
|                   |             | deposit on  |             |                                                                    |
|                   |             | Ethereum    |             |                                                                    |
|                   |             |             |             |                                                                    |
|                   |             |             |             |                                                                    |
+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+
| ``block``         | required    | Block the   |             | *5898261*                                                          |
|                   |             | transaction |             |                                                                    |
|                   |             | has been    |             |                                                                    |
|                   |             | included    |             |                                                                    |
|                   |             | into on     |             |                                                                    |
|                   |             | Ethereum    |             |                                                                    |
+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+
| ``round``         | required    | Round the   |             | *4*                                                                |
|                   |             | wallet was  |             |                                                                    |
|                   |             | registered  |             |                                                                    |
+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+
| ``amount``        | required    | Amount      |             | *1000000000000000000*                                              |
|                   |             | deposited   |             |                                                                    |
|                   |             | in *wei*    |             |                                                                    |
+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+
| ``created_on``    | required    | Date the    |             | *1970-01-01T00:00:00.000Z*                                         |
|                   |             | transaction |             |                                                                    |
|                   |             | has been    |             |                                                                    |
|                   |             | performed   |             |                                                                    |
|                   |             | (ISO        |             |                                                                    |
|                   |             | format)     |             |                                                                    |
+-------------------+-------------+-------------+-------------+--------------------------------------------------------------------+

.. _header-n9471:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /hub/audit/0x627306090abaB3A6e1400e9345bC60c78a8BEf57/deposits

.. highlight:: none

.. highlight:: json
.. code:: json

   [
       {
           "transactionId": "ee456c4f5f31e9b44c94df251690469fef4cf1c2b8f603edc62d7703acda098c",
           "block": 5898261,
           "round": 4,
           "amount": "50000",
           "time": "2018-07-03T12:33:27.409540Z",
       }
   ]

.. highlight:: none
