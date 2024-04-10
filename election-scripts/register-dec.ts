/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/create-decs-registry.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/create-decs-registry.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/create-decs-registry.ts --network sepolia
 *
 * This is the fourth step of the voting process: a public authority register the Voter's DEC on the registry.
 */
import { Response, result } from "./types";

/**
 * This function registers a DEC in the DECs Registry
 *
 * @returns {Promise<Response<string>>} - the api response containing the output of the operation
 */
export async function main(): Promise<Response<string>> {
  const response: Response<string> = {
    result: result.OK,
  };

  try {
    console.log("Register DEC");

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
