import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { DECsRegistry } from "../typechain-types/DECsRegistry";
import { generateMockAddress } from "./utils";

describe("DECs Registry Contract", function () {
  let contract: DECsRegistry;
  let owner: Signer;
  let voter: Signer;

  const electionAddress = generateMockAddress();
  const decAddress = generateMockAddress();

  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory("DECsRegistry");
    [owner, voter] = await ethers.getSigners();
    contract = await ContractFactory.deploy("test");
  });

  it("Should deploy the contract", async function () {
    expect(contract.address).to.not.equal(0);
  });

  it("should set and get name correctly", async function () {
    const newName = "New Name";

    await contract.connect(owner).setName(newName);
    const retrievedName = await contract.name();

    expect(retrievedName).to.equal(newName);
  });

  it("Should register DEC", async function () {
    const response = await contract
      .connect(owner)
      .registerDEC(decAddress, await voter.getAddress());

    expect(response.blockHash).to.not.equal(null);
    expect(response.blockHash).to.not.equal(undefined);
    expect(response.data.length).to.be.greaterThan(0);
  });

  it("Should not register DEC if already registered", async function () {
    await contract
      .connect(owner)
      .registerDEC(decAddress, await voter.getAddress());
    await expect(
      contract.connect(owner).registerDEC(decAddress, await voter.getAddress()),
    ).to.be.revertedWith("The Voter's DEC has been already registered");
  });

  it("Should get DEC", async function () {
    await contract
      .connect(owner)
      .registerDEC(decAddress, await voter.getAddress());
    const retrievedDEC = await contract.getDEC(await voter.getAddress());

    expect(retrievedDEC.length).to.be.greaterThan(0);
  });

  it("Should revert if DEC not registered", async function () {
    await expect(contract.getDEC(await voter.getAddress())).to.be.revertedWith(
      "The Voter don't have a registered DEC",
    );
  });

  it("Should return true if voter already voted", async function () {
    await contract
      .connect(owner)
      .stamps(electionAddress, await voter.getAddress());

    const hasVoted = await contract.hasVoterAlreadyVoted(
      await voter.getAddress(),
      electionAddress,
    );
    expect(hasVoted).to.be.true;
  });

  it("Should return false if voter hasn't voted", async function () {
    const hasVoted = await contract.hasVoterAlreadyVoted(
      await voter.getAddress(),
      electionAddress,
    );
    expect(hasVoted).to.be.false;
  });
});
