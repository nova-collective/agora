import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { Election } from "../typechain-types/Election";

describe("Election", function () {
  let owner: Signer;
  let electionContract: Election;
  const name = "Mock election";
  const now = Date.now();
  const tomorrow = now + 86400000;
  const dayAfterTomorrow = now + 86400000 + 86400000;

  beforeEach(async function () {
    const ElectionFactory = await ethers.getContractFactory("Election", owner);
    [owner] = await ethers.getSigners();
    electionContract = await ElectionFactory.deploy(
      name,
      tomorrow,
      dayAfterTomorrow,
      20,
    );
  });

  it("should deploy with correct initial values", async function () {
    const ownerAddress = await electionContract.owner();
    expect(ownerAddress).to.equal(await owner.getAddress());

    const start = await electionContract.getRegistrationStart();
    expect(start).to.equal(tomorrow);

    const end = await electionContract.getRegistrationEnd();
    expect(end).to.equal(dayAfterTomorrow);
  });

  it("should allow owner to change registration start date before election starts", async function () {
    const newStartDate = now + 43200000;
    await electionContract.setRegistrationStart(newStartDate);
    const start = await electionContract.getRegistrationStart();

    expect(start).to.equal(newStartDate);
  });

  it("should allow owner to change registration end date before election starts", async function () {
    const newEndDate = dayAfterTomorrow + 86400000;

    await electionContract.setRegistrationEnd(newEndDate);

    const end = await electionContract.getRegistrationEnd();
    expect(end).to.equal(newEndDate);
  });

  it("should revert when setting elections start before the end of the registration period", async function () {
    const electionStartDate = dayAfterTomorrow + 17280000;

    await expect(
      electionContract.setElectionStart(electionStartDate),
    ).to.be.revertedWith(
      "Elections can't start before the end of the registration process",
    );
  });

  it("should not allow voting before election period", async function () {
    await expect(electionContract.vote()).to.be.revertedWith(
      "Elections are not open",
    );
  });

  it("should not allow owner to change registration start date during registration period or after it ends", async function () {
    const now = Math.floor(Date.now() / 1000);

    await electionContract.setRegistrationStart(now);

    await expect(
      electionContract.setRegistrationStart(now + 1),
    ).to.be.revertedWith(
      "Registrations have already started, it's too late for changing the start of the registration",
    );

    await ethers.provider.send("evm_increaseTime", [tomorrow]);
    await expect(electionContract.setRegistrationStart(300)).to.be.revertedWith(
      "Registration are closed, it's not possible to change the start of the registration",
    );
  });

  // it("should correctly set and get the elections end", async function () {});

  // it("should not set the elections start before the end of the registration", async function () {});

  // it("should not set the elections start during the elections", async function () {});

  // it("should not set the elections start after the elections closure", async function () {});

  // it("should not set the elections end after the elections closure", async function () {});
});
