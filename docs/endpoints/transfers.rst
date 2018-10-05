
.. _header-n8809:

Transfers
---------

Transfers endpoint manages wallet transfers. You should use it to send
and checks the state of your transfers. It saves all transfers you make
in a database. Therefore it is possible to retrieve your funds if the
hub goes down, satisfying the non-custodian property.

.. _header-n8811:

Send
~~~~

Send a transfer to ``:recipient`` of ``:amount`` wei.

.. _header-n8813:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   POST /transfers/send

.. highlight:: none

.. _header-n8815:

Request
^^^^^^^

+---------------+-------------+-------------+-------------+-------------+
| Name          | Required    | Description | Default     | Example     |
|               |             |             | Value       |             |
+===============+=============+=============+=============+=============+
| ``recipient`` | required    | Ethereum    |             | *0x62730609 |
|               |             | address to  |             | 0abaB3A6e14 |
|               |             | sent the    |             | 00e9345bC60 |
|               |             | transaction |             | c78a8BEf57* |
|               |             | to          |             |             |
+---------------+-------------+-------------+-------------+-------------+
| ``amount``    | required    | Amount to   |             | *1000000000 |
|               |             | be          |             | 000000000*  |
|               |             | transfered  |             |             |
|               |             | in *wei*    |             |             |
+---------------+-------------+-------------+-------------+-------------+

.. _header-n8835:

Response
^^^^^^^^

+-------------------+-------------+-------------+-------------+-------------+
| Name              | Required    | Description | Default     | Example     |
|                   |             |             | Value       |             |
+===================+=============+=============+=============+=============+
| ``sender``        | required    | Ethereum    |             | *0x62730609 |
|                   |             | address     |             | 0abaB3A6e14 |
|                   |             | used to     |             | 00e9345bC60 |
|                   |             | perform the |             | c78a8BEf57* |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``recipient``     | required    | Ethereum    |             | *0x62730609 |
|                   |             | address of  |             | 0abaB3A6e14 |
|                   |             | the         |             | 00e9345bC60 |
|                   |             | recipient   |             | c78a8BEf57* |
+-------------------+-------------+-------------+-------------+-------------+
| ``amount``        | required    | Amount to   |             | *1000000000 |
|                   |             | be          |             | 000000000*  |
|                   |             | transfered  |             |             |
|                   |             | in *wei*    |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``created_on``    | required    | Date the    |             | *1970-01-01 |
|                   |             | transaction |             | T00:00:00.0 |
|                   |             | has been    |             | 00Z*        |
|                   |             | performed   |             |             |
|                   |             | (ISO        |             |             |
|                   |             | format)     |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``nonce``         | required    | Identifier  |             | *1270040570 |
|                   |             | generated   |             | *           |
|                   |             | from        |             |             |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``transactionId`` | required    | Unique      |             | *1*         |
|                   |             | identifier  |             |             |
|                   |             | of the      |             |             |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``status``        | required    | Status of   |             | *confirmed, |
|                   |             | the         |             | pending*    |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+

.. _header-n8885:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   POST /tranfers/send?recipient=0x627306090abaB3A6e1400e9345bC60c78a8BEf57&amount=1

.. highlight:: none

.. highlight:: json
.. code:: json

   {
       "sender": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
       "recipient": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
       "amount": "1",
       "created_on": "1970-01-01T00:00:00.000Z",
       "nonce": "1270040570",
       "txId": 1,
       "status": "pending",
   }

.. highlight:: none

.. _header-n8889:

List
~~~~

List all transfer performed by the automaton during this round. Filters
can be applied.

.. _header-n8891:

Endpoint
^^^^^^^^

.. highlight:: http
.. code:: http

   GET /transfers/list

.. highlight:: none

.. _header-n8893:

Request
^^^^^^^

+-------------------+-------------+-------------+-------------+-------------+
| Name              | Required    | Description | Default     | Example     |
|                   |             |             | Value       |             |
+===================+=============+=============+=============+=============+
| ``count``         | optional    | Amount to   | 100         | *50*        |
|                   |             | be          |             |             |
|                   |             | transfered  |             |             |
|                   |             | in *wei*    |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``recipient``     | optional    | Ethereum    |             | *0x62730609 |
|                   |             | address to  |             | 0abaB3A6e14 |
|                   |             | sent the    |             | 00e9345bC60 |
|                   |             | transaction |             | c78a8BEf57* |
|                   |             | to          |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``sender``        | optional    | Ethereum    | SDK's       | *0x62730609 |
|                   |             | address     | ethereum    | 0abaB3A6e14 |
|                   |             | used to     | address     | 00e9345bC60 |
|                   |             | perform the |             | c78a8BEf57* |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``amount``        | optional    | Amount to   |             | *1000000000 |
|                   |             | be          |             | 000000000*  |
|                   |             | transfered  |             |             |
|                   |             | in *wei*    |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``transactionId`` | optional    | Unique      |             | *1*         |
|                   |             | identifier  |             |             |
|                   |             | of the      |             |             |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``status``        | optional    | Status of   | confirmed   | *confirmed, |
|                   |             | the         |             | pending*    |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+

.. _header-n8937:

Response
^^^^^^^^

Array

+-------------------+-------------+-------------+-------------+-------------+
| Name              | Required    | Description | Default     | Example     |
|                   |             |             | Value       |             |
+===================+=============+=============+=============+=============+
| ``recipient``     | required    | Ethereum    |             | *0x62730609 |
|                   |             | address to  |             | 0abaB3A6e14 |
|                   |             | sent the    |             | 00e9345bC60 |
|                   |             | transaction |             | c78a8BEf57* |
|                   |             | to          |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``sender``        | required    | Ethereum    | SDK's       | *0x62730609 |
|                   |             | address     | ethereum    | 0abaB3A6e14 |
|                   |             | used to     | address     | 00e9345bC60 |
|                   |             | perform the |             | c78a8BEf57* |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``amount``        | required    | Amount to   |             | *1000000000 |
|                   |             | be          |             | 000000000*  |
|                   |             | transfered  |             |             |
|                   |             | in *wei*    |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``transactionId`` | required    | Unique      |             | *1*         |
|                   |             | identifier  |             |             |
|                   |             | of the      |             |             |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``status``        | required    | Status of   |             | *confirmed, |
|                   |             | the         |             | pending*    |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``nonce``         | required    | Identifier  |             | *1270040570 |
|                   |             | generated   |             | *           |
|                   |             | from        |             |             |
|                   |             | transaction |             |             |
+-------------------+-------------+-------------+-------------+-------------+
| ``created_on``    | required    | Date the    |             | *1970-01-01 |
|                   |             | transaction |             | T00:00:00.0 |
|                   |             | has been    |             | 00Z*        |
|                   |             | performed   |             |             |
|                   |             | (ISO        |             |             |
|                   |             | format)     |             |             |
+-------------------+-------------+-------------+-------------+-------------+

.. _header-n8989:

Example
^^^^^^^

.. highlight:: http
.. code:: http

   GET /transfers/list?status=pending

.. highlight:: none

.. highlight:: json
.. code:: json

   [
       {
           "sender": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
           "recipient": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
           "amount": "1",
           "created_on": "1970-01-01T00:00:00.000Z",
           "nonce": "1270040570",
           "txId": 1,
           "status": "pending",
       }
   ]

.. highlight:: none
