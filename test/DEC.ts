import { ethers } from "hardhat";
import { expect } from "chai";

describe("DEC Contract", function () {
  let DEC: any;
  let decContract: any;
  let ownerAddress: any;

  before(async function () {
    DEC = await ethers.getContractFactory("DEC");
    [ownerAddress] = await ethers.getSigners();
  });

  beforeEach(async function () {
    decContract = await DEC.deploy();
  });

  it("should deploy the contract and set the owner", async function () {
    expect(await decContract.owner()).to.equal(ownerAddress.address);
  });

  it("should encrypt DEC data correctly", async function () {
    const decData = {
      taxCode: "123456789",
      municipality: "Sample Municipality",
      province: "Sample Province",
      region: "Sample Region",
      country: "Sample Country",
    };

    const encryptedData = await decContract.encryptDEC(decData);

    expect(encryptedData.data).to.not.be.null;
  });
});
