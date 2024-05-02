/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/create-decs-registry.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/create-decs-registry.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/create-decs-registry.ts --network sepolia
 *
 * This is the first step of the voting process: a public authority creates the public registry of the DECs
 * where all the DECs are registered. In a next step, after the DEC creation, the Voter DEC is registered on the Registry.
 * This register is created once for all the future elections.
 */
import { ethers } from "hardhat";
import { Response, result, RegistryResponse } from "./types";
import { DECsRegistryData } from "./__mocks__";
import { DECsRegistry } from "../typechain-types";
import { Signer } from "ethers";

let owner: Signer;

/**
 * This function deploy an instance of the DECs Registry. The registry is unique and needs to be
 * deployed only once.
 *
 * @returns {Promise<Response<string>>} - the api response containing the output of the operation
 */
export async function main(): Promise<Response<RegistryResponse>> {
  const response: Response<RegistryResponse> = {
    result: result.OK,
  };

  try {
    const ContractFactory = await ethers.getContractFactory("DECsRegistry");
    const contract: DECsRegistry = await ContractFactory.deploy(
      DECsRegistryData.name,
    );

    const contractName = await contract.name;

    console.log(
      `The contract "${contractName}" has been successfully deployed`,
    );

    const address = await contract.getAddress();
    [owner] = await ethers.getSigners();

    const registryResponse: RegistryResponse = {
      address,
      owner,
    };
    response.data = registryResponse;

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
