/* eslint-disable @typescript-eslint/no-var-requires */
const execSync = require("child_process").execSync;
const fs = require("fs");

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
  tagRelease: function () {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const version = packageJson.version;

    const tags = execSync("git tag", { encoding: "utf8" }).split("\n");

    if (tags.includes(`v${version}`)) {
      console.error(`Error: The tag for the version ${version} already exists`);
      return;
    }
    execSync(`git tag -a v${version} -m "Version ${version}"`, execSyncOptions);
    execSync("git push origin --tags", execSyncOptions);
  },
};

module.exports = functions;
