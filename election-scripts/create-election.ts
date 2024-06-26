/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/create-election.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/create-voter-eoa.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/create-voter-eoa.ts --network sepolia
 *
 * This is the fifth step of the voting process: a public authority creates an election by
 * deploying the election smart contract passing the required data in the constructor.
 * Then, the script registers the parties and the names of the councilior and mayor candidates.
 */
import { ethers } from "hardhat";
import {
  Response,
  result,
  Ballot,
  Party,
  Coalition,
  Candidature,
  ElectionData,
} from "./types";
import { Signer } from "ethers";
import { MunicipalityElection } from "../typechain-types/MunicipalityElection";
import {
  PARTIES,
  MUNICIPALITY_ELECTION_DATA,
  MAJOR_CANDIDATE_1,
  MAJOR_CANDIDATE_2,
  PARTY_NAME_A,
  PARTY_NAME_B,
  PARTY_NAME_C,
  PARTY_NAME_D,
} from "./__mocks__";

let owner: Signer;
/**
 * This function deploys the contract, registers the parties, the coalitions, the councilor candidates and the
 * mayor candidate to a given municipality election contract and returns the list of the data registered ready to be use for a ballot.
 *
 * @param {ElectionData} electionData - data required to deploy the smart contract, used for testing purposes
 * @returns {Promise<Response<Ballot>>} - this response contains the data of the ballot to be used for voting
 */
export async function main(
  electionData?: ElectionData,
): Promise<Response<Ballot>> {
  const response: Response<Ballot> = {
    result: result.OK,
  };

  try {
    const ContractFactory = await ethers.getContractFactory(
      "MunicipalityElection",
    );

    [owner] = await ethers.getSigners();

    const contract: MunicipalityElection = await ContractFactory.deploy(
      electionData?.name || MUNICIPALITY_ELECTION_DATA.name,
      electionData?.municipality || MUNICIPALITY_ELECTION_DATA.municipality,
      electionData?.region || MUNICIPALITY_ELECTION_DATA.region,
      electionData?.country || MUNICIPALITY_ELECTION_DATA.country,
      electionData?.registrationStart ||
        MUNICIPALITY_ELECTION_DATA.registrationStart,
      electionData?.registrationEnd ||
        MUNICIPALITY_ELECTION_DATA.registrationEnd,
      electionData?.votingPoints || MUNICIPALITY_ELECTION_DATA.votingPoints,
    );

    const address = await contract.getAddress();
    const parties: Party[] = [];
    const coalitions: Coalition[] = [];

    for (const party of PARTIES) {
      await contract
        .connect(owner)
        .registerParty(party.name, party.councilorCandidates);
      const candidatesRegistered = await contract.getCandidatesByParty(
        party.name,
      );
      parties.push(party);

      console.log(
        `registered party ${party.name} with candidates: ${JSON.stringify(candidatesRegistered)}`,
      );
    }

    await contract
      .connect(owner)
      .registerCoalition(MAJOR_CANDIDATE_1, [PARTY_NAME_A, PARTY_NAME_B]);
    const coalition1Raw = await contract.getCoalition(0);

    const coalition1: Coalition = {
      mayorCandidate: {
        name: coalition1Raw[0][0],
        candidatesFor: coalition1Raw[0][1] as Candidature,
        points: 0,
      },
      parties: [],
    };

    for (const p of parties) {
      for (const k of coalition1Raw[1]) {
        if (k === p.name) {
          p.points = 0;
          coalition1.parties.push(p);
        }
      }
    }

    coalitions.push(coalition1);

    console.log(
      `registered coalition for mayor candidate: ${coalition1Raw[0]} and parties ${coalition1Raw[1]}`,
    );

    await contract
      .connect(owner)
      .registerCoalition(MAJOR_CANDIDATE_2, [PARTY_NAME_C, PARTY_NAME_D]);
    const coalition2Raw = await contract.getCoalition(1);

    const coalition2: Coalition = {
      mayorCandidate: {
        name: coalition2Raw[0][0],
        candidatesFor: coalition2Raw[0][1] as Candidature,
        points: 0,
      },
      parties: [],
    };

    for (const p of parties) {
      for (const k of coalition2Raw[1]) {
        if (k === p.name) {
          p.points = 0;
          coalition2.parties.push(p);
        }
      }
    }

    coalitions.push(coalition2);

    console.log(
      `registered coalition for mayor candidate: ${coalition2Raw[0]} and parties ${coalition2Raw[1]}`,
    );

    const ballot: Ballot = {
      contractAddress: address,
      coalitions,
    };

    response.data = ballot;

    return response;
  } catch (e: any) {
    response.result = result.ERROR;
    response.errorMessage = e.message || "unknown error";
    return response;
  }
}

main()
  .then((response) => {
    console.log(JSON.stringify(response));
    return response;
  })
  .catch((error) => {
    console.error(error);
  });
