# Agora
A confidentiality-first electronic voting system

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

In the context of a digital governance, anonymity is not required and even unwanted: in some countries voting is mandatory, and knowing whether a person voted or not in an election is a data that should be kept transparent, as it is in traditional paper voting.
Confidentiality, that is an absolute requirement, can be divided into three categories:
* conditional privacy: the system has the ability to make the data visible to a third party. And this is something we don’t want in a voting system.
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

* **a Tor network for blockchain transactions**, to prevent network analysis and the revelation of IP addresses of origin (layer 0 solution);
* **an implementation of a Zk-SNARKS protocol for the Ethereum smart contracts**, with the help of ZoKrates (layer 1 solution);

# How Agora Works in a nutshell

Agora is a **dApp composed by a web front end and a backed** composed by an application server and a database. The backend interacts with the underliyng public Ethreum network.
The application provides two types of users: 

* **Admin users**: access the admin area and they can create a manage an election;
* **Voter users**: they can register to the plaform as voters, they can vote, and check if the vote is correctly registered on the blockchain network;

The homepage is accessible to everyone, in the home page is possible to consult the results of the elections.

The admin user creates an election. **The election is a smart contract deployed on the blockchain**.

In order to vote, the Voter must be owner of a **Digital Electoral Card**, **a smart contract deployed on the blockchain and is releases by a third party authority to each individual with vote rights**. The Electronic Electoral card gives the right to vote, the voter uses the Electornic Digital Voting card private key to sign and cast the vote.

The Agora platorm, with the support of the smart contracts methods, checks the Digital Voting Cards data and the election data in order to allow the user to vote.
**After the user casts the vote, The election metadata are "stamped" to the Digital Voting card, this prevents a Voter to vote more than one time**.


# Works References

* Alshehri, Ali, et al. “Privacy-Preserving E-Voting System Supporting Score Voting Using Blockchain.” MDPI, 13 January 2023, https://www.mdpi.com/2076-3417/13/2/1096. Accessed 18 February 2024.
* Bashir, Imran. Mastering Blockchain: A Technical Reference Guide to Whats Under the Hood of Blockchain, from Cryptography to DeFi and NFTs. Packt Publishing, Limited, 2023. Accessed 25 February 2024.
* Ben-Sasson, Eli, et al. “Scalable, transparent, and post-quantum secure computational integrity.” Cryptology ePrint Archive, 6 March 2018, https://eprint.iacr.org/2018/046.pdf. Accessed 25 February 2024.
* Ben-Sasson, Eli, et al. “Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture.” Cryptology ePrint Archive, https://eprint.iacr.org/2013/879.pdf. Accessed 25 February 2024.
* McCorry, Patrick, et al. “,.” , - YouTube, 19 May 2023, https://link.springer.com/chapter/10.1007/978-3-319-70972-7_20. Accessed 18 February 2024.
* Reitwießner, Christian. “zkSNARKs in a Nutshell unicode.” GitHub Pages, http://chriseth.github.io/notes/articles/zksnarks/zksnarks.pdf. Accessed 25 February 2024.
* Singh, Abhay, et al. “Secure Voting Website Using Ethereum and Smart Contracts.” MDPI, https://www.mdpi.com/2571-5577/6/4/70. Accessed 18 February 2024.

