/**
 * In order to run this script in hardhat, run the command: npx hardhat run election-scripts/create-dec.ts
 * to run the script over a network configured in the hardhat.config.ts run:
 * npx hardhat run election-scripts/create-dec.ts --network <network-configured>, example:
 * npx hardhat run election-scripts/create-dec.ts --network sepolia
 *
 * This is the third step of the voting process: a public authority creates an EOA for the Voter.
 * The EOA has a public address and a private key.
 * This script deploys the DEC for the Voter by encrypting the data using the Voter's EOA private key.
 */

import { ethers } from "hardhat";
import { DEC, Response, result, CreateDECResponse } from "./types";
import { DECMock, VoterEOA } from "./__mocks__";
import { encryptString } from "../lib";
import { Encrypted } from "../lib/types";

/**
 * This function encrypt the Voter's DECs data and deploys the smart contract instance.
 *
 * @param {DEC} decsData - the list of DECs to deploy
 * @returns {Promise<Response<CreateDECResponse>>} - the api response containing the output of the operation
 */
export async function main(
  decsData?: DEC,
  privateKey?: string,
): Promise<Response<CreateDECResponse>> {
  const response: Response<CreateDECResponse> = {
    result: result.OK,
  };

  try {
    const ContractFactory = await ethers.getContractFactory("DEC");

    const dec = decsData || DECMock;
    const key = privateKey || VoterEOA.privateKey;

    const eTaxCode: Encrypted = encryptString(dec.taxCode, key);
    const eMunicipality: Encrypted = encryptString(dec.municipality, key);
    const eRegion: Encrypted = encryptString(dec.region, key);
    const eCountry: Encrypted = encryptString(dec.country, key);

    const contract = await ContractFactory.deploy(
      eTaxCode,
      eMunicipality,
      eRegion,
      eCountry,
    );

    response.data = {
      DECAddress: await contract.getAddress(),
    };

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
