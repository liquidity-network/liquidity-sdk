.. _header-n8993:

Invoice
-------

It is useful for merchant to generate a transaction that has to be
performed by its client. To that end, Liquidity SDK allows you to
generate invoices. These are prefilled transactions that can be used by
any liquidity enabled wallet.

When an invoice is paid, a regular transaction is performed and the
invoice is resolved.

.. _header-n8995:

Generate
~~~~~~~~

Generate an invoice of ``:amount`` wei. If no ``recipient`` is provided,
the ethereum address of the wallet automaton is used.

.. _header-n8997:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   POST /invoices/generate

.. highlight:: none

.. _header-n8999:

Request
^^^^^^^

+---------------+-------------+-------------+-------------+----------------------------------------------+
| Name          | Required    | Description | Default     | Example                                      |
|               |             |             | Value       |                                              |
+===============+=============+=============+=============+==============================================+
| ``amount``    | required    | Amount to   |             | *1000000000000000000*                        |
|               |             | be          |             |                                              |
|               |             | transfered  |             |                                              |
|               |             | in *wei*    |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``recipient`` | optional    | Ethereum    | SDK's       | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|               |             | address to  | ethereum    |                                              |
|               |             | sent the    | address     |                                              |
|               |             | transaction |             |                                              |
|               |             | to          |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``details``   | optional    | Details     | ''          | *"A                                          |
|               |             | associated  |             | liquidity                                    |
|               |             | to the      |             | transaction                                  |
|               |             | transaction |             | "*                                           |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``currency``  | optional    | Token to be | ETH         | *To be                                       |
|               |             | used for    |             | implemented*                                 |
|               |             | payment     |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9031:

Response
^^^^^^^^

+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| Name             | Required    | Description | Default     | Example                                                              |
|                  |             |             | Value       |                                                                      |
+==================+=============+=============+=============+======================================================================+
| ``uuid``         | required    | Amount to   |             | 57056981-32b4-422a-9acb-c03ac4a12404                                 |
|                  |             | be          |             |                                                                      |
|                  |             | transfered  |             |                                                                      |
|                  |             | in *wei*    |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``destinations`` | required    | Array of    |             | \[                                                                   |
|                  |             | destinations|             | {                                                                    |
|                  |             |             |             | networkId:                                                           |
|                  |             |             |             | 1,                                                                   |
|                  |             |             |             | contractAddress:                                                     |
|                  |             |             |             | 0xac8c3D5242b425DE1b86b17E407D8E949D994010,                          |
|                  |             |             |             | walletAddresses:                                                     |
|                  |             |             |             | [0x627306090abaB3A6e1400e9345bC60c78a8BEf57] }]                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``amount``       | required    | Amount to   |             | *1000000000000000000*                                                |
|                  |             | be          |             |                                                                      |
|                  |             | transfered  |             |                                                                      |
|                  |             | in *wei*    |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``currency``     | required    | Unique      |             | *ETH*                                                                |
|                  |             | identifier  |             |                                                                      |
|                  |             | of the      |             |                                                                      |
|                  |             | transaction |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``details``      | required    | Sha3 Hash   | "" (empty   | *0x39ebcda37c1aaa7b6467f16d4f03479e5061031cc61b62342c9216d2ac012a5c* |
|                  |             | of provided | string)     |                                                                      |
|                  |             | details     |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``nonce``        | required    | Identifier  |             | *1270040570*                                                         |
|                  |             | generated   |             |                                                                      |
|                  |             | from        |             |                                                                      |
|                  |             | invoice     |             |                                                                      |
|                  |             | data        |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``encoded.url``  | required    | Cross       |             | *https://lqd.money/?data=eyJ1dWlkIjoiNTQxMmEyZjMz...*                |
|                  |             | platform    |             |                                                                      |
|                  |             | redirection |             |                                                                      |
|                  |             | url         |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+
| ``encoded.raw``  | required    | Encoded     |             | *eyJ1dWlkIjoiNTQxMmEyZjMz...*                                        |
|                  |             | invoice     |             |                                                                      |
|                  |             | data        |             |                                                                      |
+------------------+-------------+-------------+-------------+----------------------------------------------------------------------+

.. _header-n9075:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   POST /invoices/generate/?amount=1&recipient=0x627306090abaB3A6e1400e9345bC60c78a8BEf57

.. highlight:: none

.. highlight:: json
.. code:: json

   {
       "uuid": "288e19e69032480784305838b6158055",
       "destinations": [
           {
               "networkId": 1,
               "contractAddress": "0xac8c3D5242b425DE1b86b17E407D8E949D994010",
               "walletAddresses": ["0x627306090abaB3A6e1400e9345bC60c78a8BEf57"],
           }
       ],
       "amount": "1",
       "currency": "ETH",
       "details": "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563",
       "nonce": 1270040570,
       "encoded": {
           "url": "https://lqd.money/?data=eyJ1dWlkIjoiNTQxMmEyZjMzMzAyNDIwZGExNjU1ZjI5Y2FhMWUxNGMiLCJkZXN0aW5hdGlvbnMiOlt7Im5ldHdvcmtJZCI6MSwiY29udHJhY3RBZGRyZXNzIjoiMHhhYzhjM0Q1MjQyYjQyNURFMWI4NmIxN0U0MDdEOEU5NDlEOTk0MDEwIiwid2FsbGV0QWRkcmVzc2VzIjpbIjB4MDZBYTQxYjQxODlhRGQ3QjBFMTE0NEU3NEVhRmRFZTJiNkQ1MGUxMCJdfV0sImFtb3VudCI6MiwiY3VycmVuY3kiOiJFVEgiLCJkZXRhaWxzIjoiMHhmZTY3OWQyMDE5MDQzN2YxOGIxZGJhNDEzZmNjM2M1OGIyYzMyNjVkZTMwYzcyNGM4YzEyZDQzMzczNjJmMWExIn0%3D"
           "raw": "eyJ1dWlkIjoiNTQxMmEyZjMzMzAyNDIwZGExNjU1ZjI5Y2FhMWUxNGMiLCJkZXN0aW5hdGlvbnMiOlt7Im5ldHdvcmtJZCI6MSwiY29udHJhY3RBZGRyZXNzIjoiMHhhYzhjM0Q1MjQyYjQyNURFMWI4NmIxN0U0MDdEOEU5NDlEOTk0MDEwIiwid2FsbGV0QWRkcmVzc2VzIjpbIjB4MDZBYTQxYjQxODlhRGQ3QjBFMTE0NEU3NEVhRmRFZTJiNkQ1MGUxMCJdfV0sImFtb3VudCI6MiwiY3VycmVuY3kiOiJFVEgiLCJkZXRhaWxzIjoiMHhmZTY3OWQyMDE5MDQzN2YxOGIxZGJhNDEzZmNjM2M1OGIyYzMyNjVkZTMwYzcyNGM4YzEyZDQzMzczNjJmMWExIn0%3D"
       }
   }

.. highlight:: none
.. _header-n9079:

List
~~~~

List all transfer performed by the automaton during this round. Filters
can be applied.

.. _header-n9081:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /invoices/list

.. highlight:: none
.. _header-n9083:

Request
^^^^^^^

+---------------+-------------+-------------+-------------+----------------------------------------------+
| Name          | Required    | Description | Default     | Example                                      |
|               |             |             | Value       |                                              |
+===============+=============+=============+=============+==============================================+
| ``count``     | optional    | Amount to   | 100         | *50*                                         |
|               |             | be          |             |                                              |
|               |             | transfered  |             |                                              |
|               |             | in *wei*    |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``recipient`` | optional    | Ethereum    |             | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|               |             | address to  |             |                                              |
|               |             | sent the    |             |                                              |
|               |             | transaction |             |                                              |
|               |             | to          |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``sender``    | optional    | Ethereum    | SDK's       | *0x627306090abaB3A6e1400e9345bC60c78a8BEf57* |
|               |             | address     | ethereum    |                                              |
|               |             | used to     | address     |                                              |
|               |             | perform the |             |                                              |
|               |             | transaction |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``amount``    | optional    | Amount      |             | *1000000000000000000*                        |
|               |             | transfered  |             |                                              |
|               |             | in *wei*    |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``nonce``     | optional    | Identifier  |             | *1270040570*                                 |
|               |             | generated   |             |                                              |
|               |             | from        |             |                                              |
|               |             | invoice     |             |                                              |
|               |             | data        |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+
| ``status``    | optional    | Status of   | confirmed   | *confirmed,                                  |
|               |             | the         |             | pending*                                     |
|               |             | transaction |             |                                              |
+---------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9127:

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
| ``created_on``    | required    | Date the    |             | *1970-01-01T00:00:00.000Z*                   |
|                   |             | transaction |             |                                              |
|                   |             | has been    |             |                                              |
|                   |             | performed   |             |                                              |
|                   |             | (ISO        |             |                                              |
|                   |             | format)     |             |                                              |
+-------------------+-------------+-------------+-------------+----------------------------------------------+

.. _header-n9178:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /invoices/list?nonce=1270040570

.. highlight:: none

.. highlight:: json
.. code:: json

   {
       "sender": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
       "recipient": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
       "amount": "1",
       "created_on": "2018-07-03T12:33:27.409540Z",
       "nonce": "1270040570",
       "txId": "420",
       "status": "confirmed",
   }

.. highlight:: none
