import { assert } from "chai";
import { main } from "./create-dec";
import { Response, result } from "../election-scripts/types";
import { DECMock, PRIVATE_KEY } from "./__mocks__";

describe("Create DEC Script", () => {
  it("Should run without errors", async () => {
    const response: Response<string> = await main(DECMock, PRIVATE_KEY);
    assert.equal(response.result, result.OK);
  });

  it("Should encrypt and deploy DEC correctly", async () => {
    const response: Response<string> = await main(DECMock, PRIVATE_KEY);
    assert.equal(response.result, result.OK);
  });
});
