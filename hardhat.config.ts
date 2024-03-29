import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

const SEPOLIA_URL: string = process.env.SEPOLIA_URL || "";
const ALCHEMY_PRIVATE_KEY: string = process.env.ALCHEMY_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    currency: "EUR",
    enabled: process.env.REPORT_GAS ? true : false,
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [ALCHEMY_PRIVATE_KEY],
    },
  },
};

export default config;
