import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { MunicipalityElection } from "../typechain-types/MunicipalityElection";

describe("MunicipalityElection Contract", function () {
  let contract: MunicipalityElection;
  let owner: Signer;

  const electionName = "Mock Election";
  const partyName = "Party A";
  const partyNameB = "PArty B";
  const councilorCandidates = [
    "Candidate 1",
    "Candidate 2",
    "Candidate 3",
    "Candidate 4",
    "Candidate 5",
  ];
  const councilorCandidatesB = [
    "Candidate 6",
    "Candidate 7",
    "Candidate 8",
    "Candidate 9",
    "Candidate 0",
  ];
  const mayorCandidate = "Major Candidate";
  const coalitionParties = [partyName, partyNameB];

  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory(
      "MunicipalityElection",
    );
    [owner] = await ethers.getSigners();

    // Deploy the contract with a registration period that includes the current timestamp
    contract = (await ContractFactory.deploy(
      electionName,
      "Municipality",
      "Region",
      "Country",
      0,
      999999999999999,
      20,
    )) as MunicipalityElection;
  });

  it("Should deploy the contract", async function () {
    expect(contract.address).to.not.equal(0);
  });

  it("should register a party", async function () {
    await contract.connect(owner).registerParty(partyName, councilorCandidates);
    const result = await contract.getCandidatesByParty(partyName);

    expect(result.length).to.be.equal(5);
    expect(result[0]).to.be.equal("Candidate 1");
  });

  it("Should register a coalition", async function () {
    await contract.connect(owner).registerParty(partyName, councilorCandidates);
    await contract
      .connect(owner)
      .registerParty(partyNameB, councilorCandidatesB);
    await contract
      .connect(owner)
      .registerCoalition(mayorCandidate, coalitionParties);
    const coalition = await contract.getCoalition(0);

    expect(coalition[0][0]).to.be.equal(mayorCandidate);
    expect(coalition[0][1]).to.be.equal("mayor");
    expect(coalition[1][0]).to.be.equal(partyName);
    expect(coalition[1][1]).to.be.equal(partyNameB);
  });

  it("Should prevent to register multiple coalitions with same parties", async function () {
    await contract.connect(owner).registerParty(partyName, councilorCandidates);
    await contract
      .connect(owner)
      .registerParty(partyNameB, councilorCandidatesB);

    await contract
      .connect(owner)
      .registerCoalition(mayorCandidate, coalitionParties);
    await expect(
      contract
        .connect(owner)
        .registerCoalition(mayorCandidate, coalitionParties),
    ).to.be.revertedWith(
      "One or more parties are already present in a registered coalition",
    );
  });
});
