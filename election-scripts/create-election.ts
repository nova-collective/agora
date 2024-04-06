/**
 * In order to run this script in hardhat, run the command: npx hardhat run script/create-election.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run script/create-voter-eoa.ts --network <network-configured>, example:
 * npx hardhat run script/create-voter-eoa.ts --network sepolia
 *
 * This is the third step of the voting process: a public authority already created an election by
 * deploying the election smart contract passing the required data in the constructor.
 * At this point the deploy is already made using an ignition module, in this script we register the parties and the
 * names of the councilior and major candidates.
 *
 * before to run this script set:
 * 1. the address of the election smart contract instance deployed on the blockchain;
 */
import { ethers } from "hardhat";
import { Response, result, Ballot } from "./types";
import { MUNICIPALITY_ELECTION_ADDRESS } from "./__mocks__";

/**
 * This function register the parties, the coalitions, the councilor candidates and the major candidate to a given municipality election contract
 * and returns the list of the data registered ready to be use for a ballot.
 *
 * @returns {Promise<Response<Ballot>>} - this response contains the data of the ballot to be used for voting
 */
export async function main(): Promise<Response<Ballot>> {
  const response: Response<Ballot> = {
    result: result.OK,
  };

  const mCont = await ethers.getContractAt(
    "MunicipalityElection",
    MUNICIPALITY_ELECTION_ADDRESS,
  );

  console.log("--------------------");
  console.log(mCont);
  console.log("--------------------");

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
