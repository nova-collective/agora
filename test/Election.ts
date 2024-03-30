import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { Election } from "../typechain-types/Election";

describe("Election", function () {
  let owner: Signer;
  let electionContract: Election;
  const now = Date.now();
  const tomorrow = now + 86400000;
  const dayAfterTomorrow = now + 86400000 + 86400000;

  beforeEach(async function () {
    const ElectionFactory = await ethers.getContractFactory("Election", owner);
    [owner] = await ethers.getSigners();
    electionContract = await ElectionFactory.deploy(tomorrow, dayAfterTomorrow);
  });

  it("should deploy with correct initial values", async function () {
    const ownerAddress = await electionContract.owner();
    expect(ownerAddress).to.equal(await owner.getAddress());

    const start = await electionContract.getElectionStart();
    expect(start).to.equal(tomorrow);

    const end = await electionContract.getElectionEnd();
    expect(end).to.equal(dayAfterTomorrow);
  });

  it("should allow owner to change election start date before election starts", async function () {
    const newStartDate = now + 43200000;
    await electionContract.setElectionStart(newStartDate);
    const start = await electionContract.getElectionStart();

    expect(start).to.equal(newStartDate);
  });

  it("should allow owner to change election end date before election starts", async function () {
    const newEndDate = dayAfterTomorrow + 86400000;

    await electionContract.setElectionEnd(newEndDate);

    const end = await electionContract.getElectionEnd();
    expect(end).to.equal(newEndDate);
  });

  it("should not allow voting before election period", async function () {
    await expect(electionContract.vote()).to.be.revertedWith(
      "Elections are not open",
    );
  });

  it("should not allow owner to change election start date during election or after it ends", async function () {
    const now = Math.floor(Date.now() / 1000);

    await electionContract.setElectionStart(now);

    await expect(electionContract.setElectionStart(now + 1)).to.be.revertedWith(
      "Elections have already started, it's too late for changing the start of the elections",
    );

    await ethers.provider.send("evm_increaseTime", [tomorrow]);
    await expect(electionContract.setElectionStart(300)).to.be.revertedWith(
      "Elections are closed, it's not possible to change the start of the elections",
    );
  });
});
