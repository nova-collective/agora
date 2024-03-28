/**
 * In order to run this script in hardhat, run the command: npx hardhat run script/create-voter-eoa.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run script/create-voter-eoa.ts --network <network-configured>, example:
 * npx hardhat run script/create-voter-eoa.ts --network goerli
 *
 * This is the first step of the voting process: a public authority creates an EOA for the Voter, the
 * script returns the public address and the private key that are communicated to the Voter.
 */
import { ethers } from "hardhat";
import { Response, EOAResponse, result } from "./types";

export async function main(): Promise<Response<EOAResponse>> {
  const response: Response<EOAResponse> = {
    result: result.OK,
  };
  try {
    const wallet = ethers.Wallet.createRandom();

    const EOAResponse: EOAResponse = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };

    response.data = EOAResponse;

    return response;
  } catch (e: any) {
    response.result = result.ERROR;
    response.errorMessage = e.message || "unknown error";
    return response;
  }
}

main()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
