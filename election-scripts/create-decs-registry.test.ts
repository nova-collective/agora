import { expect } from "chai";
import { main } from "./create-decs-registry";
import { RegistryResponse, Response, result } from "../election-scripts/types";

describe("Create DECs Registry Script", () => {
  it("Should run without errors", async () => {
    const response: Response<RegistryResponse> = await main();
    expect(response.result).to.equal(result.OK);
  });
});
