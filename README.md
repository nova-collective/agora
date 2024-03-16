<img src="docs/assets/logo.jpg" alt="Agora" width="500"/>

A confidentiality-first electronic voting system.

## About

The most indispensable operations of a democracy are elections.
Over the last few years there has been a **progressive decline in voter turnout** in Europe and Western countries in general.
The causes of this phenomenon can be different and we will not investigate them here, but electronic voting could represent a change that would allow people to regain trust in institutions and elections.

**Electronic voting** allows operations to be carried out remotely but many concerns have been expressed about the fact that they can be manipulated.
The latest algorithms **guarantee privacy, anonymity and transparency of voting mechanisms, along with clear verifiability of the vote**. Despite this, security incidents still occur and an electronic vote system that satisfies all the required characteristics has yet to be realized.

**Blockchain technology and Dapps** have high potential compared to electronic voting due to its characteristics of immutability, traceability and transparency. In recent years, many steps forward have also been made in terms of voting privacy and secrecy thanks to the implementation of **zero-knowledge proof encryption**.

This project still leaves many critical issues open such as:

* the possibility of impersonation due to the difficulties in authenticating the voter;
* scalability problems especially on a large amount of data;
* the possibility of cyber attacks of various types;

However, the objectives of this project are two:
1. To demonstrate how, using the zero-knowledge proof cryptography, it is possible to guarantee those indispensable conditions in a voting system such as privacy and secrecy of the vote even with an open, distributed and transparent technology such as a public blockchain.
2. The new possibilities that electronic voting opens up in terms of mechanisms: as an example we want to develop a points voting system;

## Privacy and blockchain
Data privacy refers to protection of personal and sensitive information and the right of individuals to control how their personal information is collected, stored, used and shared. **In the context of a digital election, the privacy element is vital**, in order to protect individuals and the integrity and transparency of the voting mechanism.

However, in the blockchain context there is a lack of rigor in terms of privacy. To reach the required level of privacy required by a digital governance is an issue that needs to be addressed.
There are different protocols that introduce privacy in the context of blockchain.

Privacy in blockchain can be divided into two main categories:

1. anonymity of the user;
2. confidentiality of the transactions;

Anonymity is concerned with hiding the sender’s or receiver identity, confidentiality addresses the requirements of hiding transaction values.

Blockchain by their nature does not preserve privacy because of their mechanism of block approvals. All transaction data, including account details, inputs, outputs and states are visible to anyone on the blockchain and privacy can not be preserved.
One solution is to encrypt the data but if the value is hidden the data cannot be verified. The need is to combine public verifiability and confidentiality.

Confidentiality can be divided into three categories:
* conditional privacy: the system has the ability to make the data visible to a third party.
* unconditional privacy: generally speaking this can be dangerous in the context of a blockchain because it can permit criminal activities.
* Selective disclosure: Only some data is visible and the other data is hidden, this is the case of a voting system based on a blockchain, where we can make visible the person who voted, but not how they voted. Range proof allows to prove that a voter is more than 18 years old, but it does not reveal how the person voted.

The transparency of blockchain transactions combined with network traffic analysis permits to reveal the IP address that made the transaction. This is a big problem from a privacy point of view.
The different techniques available **to provide a solution to anonymity and confidentiality** can be divided into different categories:

* **layer 0**: network layer methods, the mechanism operates at network level;
* **layer 1**: on-chain methods, the mechanism operates at at blockchain protocol;
* **layer 2**: off-chain methods, the mechanism operates outside the the main blockchain, but achieve privacy on the blockchain;

Layer 0 solutions include the use of technologies like Tor Network and I2P.
Tor: The Onion Router is a common choice to enable anonymous communications.
I2P: Invisible Internet Project, is an anonymous network built on the internet.
A third solution can be a silver bullet for privacy in the blockchain but it is not yet production ready: Indistinguishability Obfuscation, with this technique the inner mechanism of a smart contract is totally hidden. The technique consists in mixing the smart contract logic with random elements, making it computationally infeasible for an attacker to distinguish between two different program executions even if the attacker has complete access to the program code.
Other techniques, not production ready are: homomorphic encryption, secure multiparty computer, trusted hardware-assisted confidentiality.


### Zero-knowledge proofs
The future of blockchain is going to be heavily oriented around the techniques reported above.
The following papers illustrates the ZK proofs with Ethereum:

* [Succinct Non-interactive Zero-knowledge](https://eprint.iacr.org/2013/879.pdf)
* [ZkSNARKS in a nutshell](http://chriseth.github.io/notes/articles/zksnarks/zksnarks.pdf)

**Zk-STARKS** is an improvement of Zk-SNARKS, the original paper can be found [here](https://eprint.iacr.org/2018/046.pdf). A tool that implements a Zk-SNARKS on Ethereum is [ZoKrates](https://zokrates.github.io/).


# Solution proposed

**The main objective of this project is to implement a digital governance system  which includes features of anonymity and confidentiality**.
In order to achieve this goal,  the proposed solution includes the usage of:

* **a Tor network for the application and the blockchain transactions**, to prevent network analysis and the revelation of IP addresses of origin (layer 0 solution);
* **an implementation of a Zk-SNARKS protocol for the Ethereum smart contracts**, with the help of ZoKrates (layer 2 solution);

# How Agora works

Agora is a **dApp composed by a web front end and a backed** composed by an application server and a database. The backend interacts with the underlying public Ethereum network.
The application provides two types of users: 

* **Admin users**: access the admin area and they can create a manage elections;
* **Voter users**: they can register to the platform as voters, they can vote, and check if the vote is correctly registered on the blockchain network;

The homepage is accessible to everyone, in the home page is possible to consult the results of the elections.

**The voting protocol** of Agora consists of 5 phases:

* **Phase 0, release of the Digital Electoral Card**: An authority generates and releases a Digital Electoral Card smart contract on blockchain for the voter and delivers the public address and private (secret) key pair to the voter:

  ![phase 0](docs/assets/agora_main_sequence_diagrams-Phase%200.jpg)

* **Phase 1, setup**: An admin initializes and opens an election, prepares the lists and candidates, prepares the list of voters and all the information of the election (region, province, municipality, etc.) which will be cross-referenced with the data of the voter's electoral card to verify the right to vote:

  ![phase 1](docs/assets/agora_main_sequence_diagrams-Phase%201.jpg)

* **Phase 2, registration**: to initialize phase 2, the admin must determine the time period for registration. The server generates the Registration smart contract and releases it onto the blockchain. The recording time is saved and the election status updated to “recording”. During the registration period, each voter authenticates on the client server. The voter registers the address of his Digital Electoral Card smart contract on the Registration smart contract, signing the transaction with the private key and the blockchain:

  ![phase 2](docs/assets/agora_main_sequence_diagrams-Phase%202.jpg)

* **Phase 3, voting**: the admin specifies the time interval for voting. When the server receives the time interval, it generates a Voting smart contract and deploy it on the blockchain. When the voting period begins, the voting status is updated and voters can access the list of candidates from the server, the server verifies the election and Digital Electoral Card data to authorize voting, checking that the Electoral Card has not been already "stamped". The voter carries out the vote and generates the related proof π-vote. The voter sends the transaction to the Voting smart contract. The computations are done locally in the voter's machine and the transaction is sent directly to the smart contract. the client server does not acquire any information from the voter. The Voting smart contract that has acquired the π-vote proof double check the voting rights and prints on the Digital Electoral Card and "prints" the election metadata on the voter's Digital Electoral Card smart contract:

  ![phase 3](docs/assets/agora_main_sequence_diagrams-Phase%203.jpg)

* **Phase 4, calculation of the result**: when the voting period ends, the server automatically closes the voting and updates the status of the election. The server takes all the ballots from the Voting smart contract and calculates the result. The server generates a proof π-result of the election results and sends the proof to the Voting smart contract. When the election results are published, a check can be carried out by interacting directly with the blockchain to extract the result and the validity of the proof. the result is considered valid only when the corresponding proof π-result is valid.
The voter can also check whether her vote was correctly counted in the calculation of the results:

  ![phase 4](docs/assets/agora_main_sequence_diagrams-Phase%204.jpg)


What happens if a Voter registers for an election and then it does not vote? The vote is simply considered as "white ballot", in analogy with traditional voting systems.

Ok, but who pays the bill? Every transaction on the blockchain, from the deploy of smart contracts to the execution of their methods have a price in terms of gas fees. For the purpose of this project this topic is not explored in depth, anyway it is clear that this fees can't be in charge of the voters.

The electronic vote also allows to introduce a variety of voting mechanisms: just as example, Agora implements a mechanism that gives to each voter 20 voting points to be distributed across the candidates.

# Resources

* [Agora functional analysis](https://github.com/g3k0/agora/wiki/2.-Functional-analysis)
* [Agora technical analysis](https://github.com/g3k0/agora/wiki/3.-Technical-analysis)
* [Zero-Knowledge Proofs](https://zkp.science/)

# Donations
Support this project and offer me a crypto-coffee!!

![wallet](docs/assets/wallet_address.png)


# Works References

* Alshehri, Ali, et al. “Privacy-Preserving E-Voting System Supporting Score Voting Using Blockchain.” MDPI, 13 January 2023, https://www.mdpi.com/2076-3417/13/2/1096. Accessed 18 February 2024.
* Bashir, Imran. Mastering Blockchain: A Technical Reference Guide to Whats Under the Hood of Blockchain, from Cryptography to DeFi and NFTs. Packt Publishing, Limited, 2023. Accessed 25 February 2024.
* Ben-Sasson, Eli, et al. “Scalable, transparent, and post-quantum secure computational integrity.” Cryptology ePrint Archive, 6 March 2018, https://eprint.iacr.org/2018/046.pdf. Accessed 25 February 2024.
* Ben-Sasson, Eli, et al. “Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture.” Cryptology ePrint Archive, https://eprint.iacr.org/2013/879.pdf. Accessed 25 February 2024.
* McCorry, Patrick, et al. “,.” , - YouTube, 19 May 2023, https://link.springer.com/chapter/10.1007/978-3-319-70972-7_20. Accessed 18 February 2024.
* Reitwießner, Christian. “zkSNARKs in a Nutshell unicode.” GitHub Pages, http://chriseth.github.io/notes/articles/zksnarks/zksnarks.pdf. Accessed 25 February 2024.
* Singh, Abhay, et al. “Secure Voting Website Using Ethereum and Smart Contracts.” MDPI, https://www.mdpi.com/2571-5577/6/4/70. Accessed 18 February 2024.
* Li, Yunxuan. “A privacy preserving ethereum-based E-voting system.” OPUS - Online Publikationen der Universität Stuttgart, 2 January 2019, https://elib.uni-stuttgart.de/handle/11682/10426. Accessed 12 March 2024.


