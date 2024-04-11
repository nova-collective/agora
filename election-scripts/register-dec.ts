/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/register-dec.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/register-dec.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/register-dec.ts --network sepolia
 *
 * This is the fourth step of the voting process: a public authority register the Voter's DEC on the registry.
 */
import { ethers } from "hardhat";
import { Response, result } from "./types";
import { DECsRegistryData } from "./__mocks__";
import { Signer } from "ethers";

let owner: Signer;

/**
 * This function registers a DEC in the DECs Registry
 *
 * @returns {Promise<Response<string>>} - the api response containing the output of the operation
 */
export async function main(): Promise<Response<string>> {
  const response: Response<string> = {
    result: result.OK,
  };

  const contract = await ethers.getContractAt(
    "DECsRegistry",
    DECsRegistryData.address,
  );

  [owner] = await ethers.getSigners();

  await contract
    .connect(owner)
    .registerDEC(DECsRegistryData.DECAddress, DECsRegistryData.voterEOAAddress);

  const name = await contract.getName();
  console.log(name);
  // const dec = await contract.getDEC(DECsRegistryData.voterEOAAddress);

  // console.log(
  //   `The DEC ${dec} was successfully registered for voter ${DECsRegistryData.voterEOAAddress}`,
  // );

  try {
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
