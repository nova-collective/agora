import { ethers } from "hardhat";
import { expect } from "chai";
import { main } from "./create-election";
import { PARTIES } from "./__mocks__";

describe("Create Election Script", () => {
  it("should deploy contract and register parties and coalitions", async () => {
    const response = await main({
      name: "Election of major of Braccagni city",
      municipality: "Braccagni",
      region: "Toscana",
      country: "Italy",
      registrationStart: 0,
      registrationEnd: 9999999999,
      votingPoints: 20,
    });

    expect(response).to.exist;
    expect(response.result).to.equal("ok");

    const contractAddress = response.data!.contractAddress;
    const contract = await ethers.getContractAt(
      "MunicipalityElection",
      contractAddress,
    );

    for (const party of PARTIES) {
      const candidatesRegistered = await contract.getCandidatesByParty(
        party.name,
      );
      expect(candidatesRegistered).to.deep.equal(party.councilorCandidates);
    }

    const coalitions = response.data!.coalitions;
    for (const coalition of coalitions) {
      const coalitionFromContract = await contract.getCoalition(
        coalitions.indexOf(coalition),
      );
      expect(coalitionFromContract[0][0]).to.equal(
        coalition.majorCandidate.name,
      );
      expect(coalitionFromContract[0][1]).to.equal(
        coalition.majorCandidate.candidatesFor,
      );
      expect(coalitionFromContract[0][2]).to.equal(
        coalition.majorCandidate.points,
      );
      expect(coalitionFromContract[1]).to.deep.equal(
        coalition.parties.map((p) => p.name),
      );
    }
  });
});
