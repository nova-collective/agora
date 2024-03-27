import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

const GOERLI_URL: string = process.env.GOERLI_URL || "";
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    currency: "EUR",
    enabled: process.env.REPORT_GAS ? true : false,
  },
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
