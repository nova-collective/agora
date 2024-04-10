import { assert } from "chai";
import { main } from "./create-decs-registry";
import { Response, result } from "../election-scripts/types";

describe("Create DECs Registry Script", () => {
  it("Should run without errors", async () => {
    const response: Response<string> = await main();
    assert.equal(response.result, result.OK);
  });
});
