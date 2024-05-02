import { expect } from "chai";
import { main } from "./create-dec";
import { Response, result, CreateDECResponse } from "../election-scripts/types";
import { DECMock, VoterEOA } from "./__mocks__";

jest.setTimeout(20000);

describe("Create DEC Script", () => {
  it("Should run without errors", async () => {
    const response: Response<CreateDECResponse> = await main(
      DECMock,
      VoterEOA.privateKey,
    );
    expect(response.result).to.equal(result.OK);
  });

  it("Should encrypt and deploy DEC correctly", async () => {
    const response: Response<CreateDECResponse> = await main(
      DECMock,
      VoterEOA.privateKey,
    );
    expect(response.result).to.equal(result.OK);
  });
});
