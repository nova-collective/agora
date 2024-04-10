/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/create-dec.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/create-dec.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/create-dec.ts --network sepolia
 *
 * This is the second step of the voting process: a public authority creates an EOA for the Voter.
 * The EOA has a public address and a private key.
 * This script deploys the DEC for the Voter by encrypting the data using the Voter's EOA private key.
 */

import { ethers } from "hardhat";
import { DEC, Response, result } from "./types";
import { DECMock, PRIVATE_KEY } from "./__mocks__";
import { encryptString } from "../lib";
import { Encrypted } from "eth-crypto";

/**
 * This function encrypt the Voter's DECs data and deploys the smart contract instance.
 *
 * @param {DEC} decsData - the list of DECs to deploy
 * @returns {Promise<Response<string>>} - the api response containing the output of the operation
 */
export async function main(
  decsData?: DEC,
  privateKey?: string,
): Promise<Response<string>> {
  const response: Response<string> = {
    result: result.OK,
  };

  try {
    const ContractFactory = await ethers.getContractFactory("DEC");

    const dec = decsData || DECMock;
    const key = privateKey || PRIVATE_KEY;

    const eTaxCode: Encrypted = await encryptString(dec.taxCode, key);
    const eMunicipality: Encrypted = await encryptString(dec.municipality, key);
    const eRegion: Encrypted = await encryptString(dec.region, key);
    const eCountry: Encrypted = await encryptString(dec.country, key);

    await ContractFactory.deploy(eTaxCode, eMunicipality, eRegion, eCountry);

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
