import { assert } from "chai";
import { ethers } from "hardhat";
import { DEC } from "../typechain-types/DEC";

describe("DEC Contract", () => {
  let dec: DEC;

  beforeEach(async () => {
    const DECFactory = await ethers.getContractFactory("DEC");
    dec = await DECFactory.deploy(
      ethers.encodeBytes32String("12345678901"),
      ethers.encodeBytes32String("Roma"),
      ethers.encodeBytes32String("Lazio"),
      ethers.encodeBytes32String("Italia"),
    );
  });

  it("Should set initial data correctly", async () => {
    assert.equal(
      await dec.owner(),
      await (await ethers.provider.getSigner(0)).getAddress(),
    );
    assert.equal(
      ethers.decodeBytes32String(await dec.getTaxCode()),
      "12345678901",
    );
    assert.equal(
      ethers.decodeBytes32String(await dec.getMunicipality()),
      "Roma",
    );
    assert.equal(ethers.decodeBytes32String(await dec.getRegion()), "Lazio");
    assert.equal(ethers.decodeBytes32String(await dec.getCountry()), "Italia");
  });

  it("Should set and get tax code correctly", async () => {
    await dec.setTaxCode(ethers.encodeBytes32String("98765432109"));
    assert.equal(
      ethers.decodeBytes32String(await dec.getTaxCode()),
      "98765432109",
    );
  });

  it("Should set and get municipality correctly", async () => {
    await dec.setMunicipality(ethers.encodeBytes32String("Milano"));
    assert.equal(
      ethers.decodeBytes32String(await dec.getMunicipality()),
      "Milano",
    );
  });

  it("Should set and get region correctly", async () => {
    await dec.setRegion(ethers.encodeBytes32String("Lombardia"));
    assert.equal(
      ethers.decodeBytes32String(await dec.getRegion()),
      "Lombardia",
    );
  });

  it("Should set and get country correctly", async () => {
    await dec.setCountry(ethers.encodeBytes32String("Francia"));
    assert.equal(ethers.decodeBytes32String(await dec.getCountry()), "Francia");
  });
});
