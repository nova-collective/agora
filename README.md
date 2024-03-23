<img src="docs/assets/logo.jpg" alt="Agora" width="500"/>

A confidentiality-first electronic voting system.

## About

Agora is a voting platform based on the [Ethereum](https://ethereum.org/en/) public blockchain and a [Zero-Knowledge Proof](https://zkp.science/) cryptographic protocol.

Consult the technical documentation in the [wiki](https://github.com/nova-collective/agora/wiki) of the project: 

* [Agora functional analysis](https://github.com/g3k0/agora/wiki/2.-Functional-analysis)
* [Agora technical analysis](https://github.com/g3k0/agora/wiki/3.-Technical-analysis)


Agora is a web3 dApp based on the [Hardhat framework](https://hardhat.org/) and the [Alchemy SDK](https://www.alchemy.com/). Consult the documentation.

## Prerequisites

In order to run the application you need the following software installed on you machine:

* [Node.js](https://nodejs.org/en) v20.11.1 or above

You also need an Alchemy account.

## Setup

To setup the application follow these steps:

1. clone this repository
2. from the root folder of the application run: `npm i`
3. run `npm run prepare`
4. copy the `commit-msg` and the `pre-commit` scripts into the `.husky` folder
5. Write a `.env` file in the root of the project and configure:
    * `GOERLI_URL` You can find the data in your Alchemy account
    * `PRIVATE_KEY` You can find the data in your Alchemy account
    * `ALCHEMY_API_KEY` You can find the data in your Alchemy account
    * `REPORT_GAS` enable or disable the gas report on smart contracts unit tests executions

## How to commit
 
1. `git add <files list>`
2. `npm run commit`

## Test

1. Run the unit tests for smart contracts: `npm run test-contracts`
2. Run the unit test code coverage for smart contracts: `npm run coverage-contracts`

Smart contracts code coverage documentation [here](https://www.npmjs.com/package/solidity-coverage).

# Donations
Support this project and offer me a crypto-coffee!!

![wallet](docs/assets/wallet_address.png)

"Crypto? No way..."

No problem, there is the related [crowdfunding campaign](https://www.gofundme.com/f/agora-sistema-di-voto-basato-su-blockchain) (in italian):

![crowdfunding](docs/assets/qr_code_go_fund_me.png)


