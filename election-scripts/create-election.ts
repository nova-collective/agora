/**
 * In order to run this script in hardhat, run the command: npx hardhat run script/create-election.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run script/create-voter-eoa.ts --network <network-configured>, example:
 * npx hardhat run script/create-voter-eoa.ts --network sepolia
 *
 * This is the third step of the voting process: a public authority creates an election by
 * deploying the election smart contract passing the required data in the constructor.
 * Then, the script registers the parties and the names of the councilior and major candidates.
 */
import { ethers } from "hardhat";
import { Response, result, Ballot } from "./types";
import { Signer } from "ethers";
import { MunicipalityElection } from "../typechain-types/MunicipalityElection";
import { PARTIES, MUNICIPALITY_ELECTION_DATA } from "./__mocks__";

let owner: Signer;

/**
 * This function deploys the contract, registers the parties, the coalitions, the councilor candidates and the
 * major candidate to a given municipality election contract and returns the list of the data registered ready to be use for a ballot.
 *
 * @returns {Promise<Response<Ballot>>} - this response contains the data of the ballot to be used for voting
 */
export async function main(): Promise<Response<Ballot>> {
  const response: Response<Ballot> = {
    result: result.OK,
  };

  const ContractFactory = await ethers.getContractFactory(
    "MunicipalityElection",
  );

  [owner] = await ethers.getSigners();

  const contract: MunicipalityElection = (await ContractFactory.deploy(
    MUNICIPALITY_ELECTION_DATA.name,
    MUNICIPALITY_ELECTION_DATA.municipality,
    MUNICIPALITY_ELECTION_DATA.region,
    MUNICIPALITY_ELECTION_DATA.country,
    MUNICIPALITY_ELECTION_DATA.registrationStart,
    MUNICIPALITY_ELECTION_DATA.registrationEnd,
    MUNICIPALITY_ELECTION_DATA.votingPoints,
  )) as MunicipalityElection;

  for (const party of PARTIES) {
    await contract
      .connect(owner)
      .registerParty(party.name, party.councilorCandidates);
    const candidatesRegistered = await contract.getCandidatesByParty(
      party.name,
    );
    console.log(
      `registered party ${party.name} with candidates: ${JSON.stringify(candidatesRegistered)}`,
    );
  }

  //const ballot: Ballot = {
  //  contractAddress: await contract.getAddress(),
  //  coalitions: [];
  //};

  //response.data = ballot;

  return response;
}

main()
  .then((response) => {
    console.log(response);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
