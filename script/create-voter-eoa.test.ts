import { expect } from "chai";
import { ethers } from "hardhat";
import { main } from "./create-voter-eoa";

describe("Main function", () => {
  /*beforeEach(() => {
    ethers.Wallet.createRandom = jest.fn().mockReturnValueOnce({
      address: "mockedAddress",
      privateKey: "mockedPrivateKey",
    });
  });*/

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a valid response with address and private key", async () => {
    ethers.Wallet.createRandom = jest.fn().mockReturnValue({
      address: "mockedAddress",
      privateKey: "mockedPrivateKey",
    });
    const response = await main();

    expect(response.result).to.equal("ok");
    expect(response.data).to.deep.equal({
      address: "mockedAddress",
      privateKey: "mockedPrivateKey",
    });
  });

  it("should return an error if ethers.Wallet does not return the data", async () => {
    ethers.Wallet.createRandom = jest.fn().mockImplementation(() => {
      throw new Error("mock error");
    });
    const response = await main();

    expect(response.result).to.equal("error");
    expect(response.errorMessage).to.equal("mock error");
  });
});
