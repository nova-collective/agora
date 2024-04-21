/* eslint-disable @typescript-eslint/no-var-requires */
const execSync = require("child_process").execSync;
const fs = require("fs");
const config = require("./config");

const execSyncOptions = { stdio: "inherit" };

const functions = {
  installDeps: function () {
    try {
      execSync("npm install", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  lint: function () {
    try {
      execSync("npm run lint", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  checksDuplications: function () {
    try {
      execSync("npm run duplicated", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  smartContractsUnitTest: function () {
    try {
      execSync("npm run test-contracts", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  scriptsUnitTest: function () {
    try {
      execSync("npm run test-scripts", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  tagRelease: function () {
    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
      const version = packageJson.version;

      const tags = execSync("git tag", { encoding: "utf8" }).split("\n");

      if (tags.includes(`v${version}`)) {
        console.error(
          `Error: The tag for the version ${version} already exists`,
        );
        return;
      }
      execSync(
        `git tag -a v${version} -m "Version ${version}"`,
        execSyncOptions,
      );
      execSync("git push origin --tags", execSyncOptions);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
  installPythonLibs: function ({ libs }) {
    try {
      const cryptoPy = libs["crypto-py"] || "";

      if (cryptoPy) {
        const libPath = path.resolve("lib");
        const repo = config.installPythonLibs.cryptoPyRepo;

        execSync(`cd ${libPath} && git clone ${repo}`, execSyncOptions);

        console.log("++++++++++repository cloned++++++++++++");
      }
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  },
};

module.exports = functions;
