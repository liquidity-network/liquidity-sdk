
.. _header-n8773:

Getting started
---------------

.. _header-n8774:

Pre-requisite
~~~~~~~~~~~~~

-  Docker: `Official
   website <https://docs.docker.com/install/#supported-platforms>`__

   Docker is a container management system. It supports Windows, mac and
   most linux distributions. Select the one that applies to your case
   and follow the instructions.

-  Docker-compose: `Official
   website <https://docs.docker.com/compose/install/>`__

   Docker compose allows advanced container management. It is required
   to build the automaton properly.

-  A Liquidity registered wallet: `Official
   website <https://wallet.liquidity.network/>`__

   This wallet will be managed by your automaton. Click on
   ``Add New Wallet``, select the wallet you want register and click on
   ``Save``. Then, open your newly created wallet, click on register and
   perform Metamask related actions.

.. _header-n8786:

Installation
~~~~~~~~~~~~

In order to get the automaton up and running on your machine, you must
follow the instructions listed below.

.. _header-n8788:

1. Clone Liquidity SDK repository 🐑
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. highlight:: shell
.. code:: shell

   git clone git@github.com/liquidity-network/liquidity-sdk

.. highlight:: none

Alternatively, you can download it from
`here <https://github.com/liquidity-network/liquidity-sdk/archive/master.zip>`__

.. _header-n8791:

2. Configure your wallet instance 🌱
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A template of the configuration is provided within
``config.template.json``. You have to copy it into ``config.json`` and
edit the configuration.

.. highlight:: shell
.. code:: shell

   cp config.template.json config.json
.. highlight:: none

Your configuration file should look like the following

Mainnet
"""""""

.. highlight:: json
.. code:: json

   {
     "ETHEREUM_WALLET_PRIVATE_KEY": "0x...",
     "ETHEREUM_NODE_URL": "https://mainnet.infura.io",
     "ETHEREUM_NETWORK_ID": "1",
     "HUB_CONTRACT_ADDRESS": "0xac8c3D5242b425DE1b86b17E407D8E949D994010",
     "HUB_PROVIDER_URL": "https://beta.liquidity.network"
   }
.. highlight:: none

Kovan Testnet
"""""""""""""
.. highlight:: json
.. code:: json

   {
     "ETHEREUM_WALLET_PRIVATE_KEY": "0x...",
     "ETHEREUM_NODE_URL": "https://kovan.infura.io",
     "ETHEREUM_NETWORK_ID": "42",
     "HUB_CONTRACT_ADDRESS": "0x182e0AA3FCE28FC6c623C80363841375Fd636E0A",
     "HUB_PROVIDER_URL": "https://kovan.liquidity.network"
   }
.. highlight:: none

.. _header-n8797:

3. Start your wallet 👩‍🔧
^^^^^^^^^^^^^^^^^^^^^^^^

.. highlight:: shell
.. code:: shell

   docker-compose up -d

.. highlight:: none

For those of you who are on have a graphic docker version, you have to
launch ``docker-compose.yml`` file located at the root of liquidity sdk
directory.

This command will start your wallet automaton. It can take some time for
it to synchronise with the hub, especially at first launch.

.. _header-n8801:

4. Celebrate 🎉
^^^^^^^^^^^^^^

You're done with the installation! The SDK is self-hosted on your
machine and is accessible under ``localhost:3600``.

You can try accessing https://localhost:3600/wallet/information where
you should see the current state of your wallet.

.. _header-n8805:

Documentation
~~~~~~~~~~~~~

The documentation you are about to read is structured in categories.
Each category has a list of endpoints made accessible by the wallet
automaton. These endpoints are documented with what they provide, how to
call them, what are their result and an example is provided.

If you spot any issues, please post an issue on our `github
repository <https://github.com/liquidity-network/liquidity-sdk>`__

