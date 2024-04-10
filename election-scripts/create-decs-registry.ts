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
import { Response, result } from "./types";
import { DECS_REGISTRY_NAME } from "./__mocks__";
import { DECsRegistry } from "../typechain-types";

/**
 * This function deploy an instance of the DECs Registry. The registry is unique and needs to be
 * deployed only once.
 *
 * @returns {Promise<Response<string>>} - the api response containing the output of the operation
 */
export async function main(): Promise<Response<string>> {
  const response: Response<string> = {
    result: result.OK,
  };

  try {
    const ContractFactory = await ethers.getContractFactory("DECsRegistry");
    const contract: DECsRegistry =
      await ContractFactory.deploy(DECS_REGISTRY_NAME);

    const contractName = await contract.getName();

    console.log(
      `The contract "${contractName}" has been successfully deployed`,
    );

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
