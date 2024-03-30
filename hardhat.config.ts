import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

const SEPOLIA_URL: string = process.env.SEPOLIA_URL || "";
const ALCHEMY_PRIVATE_KEY: string = process.env.ALCHEMY_PRIVATE_KEY || "";
const IS_OPTIMIZER_ENABLED =
  process.env.NODE_ENV === "production" ? true : false;
const DEBUG = process.env.NODE_ENV === "production" ? "default" : "debug";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: IS_OPTIMIZER_ENABLED,
        runs: 200,
        details: {
          deduplicate: true,
          cse: true,
          constantOptimizer: true,
        },
      },
      // Version of the EVM to compile for.
      // Affects type checking and code generation. Can be homestead,
      // tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul or berlin
      evmVersion: "byzantium",
      debug: {
        // How to treat revert (and require) reason strings. Settings are
        // "default", "strip", "debug" and "verboseDebug".
        // "default" does not inject compiler-generated revert strings and keeps user-supplied ones.
        // "strip" removes all revert strings (if possible, i.e. if literals are used) keeping side-effects
        // "debug" injects strings for compiler-generated internal reverts, implemented for ABI encoders V1 and V2 for now.
        // "verboseDebug" even appends further information to user-supplied revert strings (not yet implemented)
        revertStrings: DEBUG,
      },
    },
  },
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
