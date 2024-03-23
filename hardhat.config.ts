import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    currency: "EUR",
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;
