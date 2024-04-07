/* eslint-disable @typescript-eslint/no-var-requires */
const execSync = require("child_process").execSync;

const execSyncOptions = { stdio: "inherit" };

const functions = {
  installDeps: function () {
    return execSync("npm install", execSyncOptions);
  },
  lint: function () {
    return execSync("npm run lint", execSyncOptions);
  },
  checksDuplications: function () {
    return execSync("npm run duplicated", execSyncOptions);
  },
  smartContractsUnitTest: function () {
    return execSync("npm run test-contracts", execSyncOptions);
  },
  scriptsUnitTest: function () {
    return execSync("npm run test-scripts", execSyncOptions);
  },
};

module.exports = functions;
