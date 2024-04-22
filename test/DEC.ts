import { assert } from "chai";
import { ethers } from "hardhat";
import { DEC } from "../typechain-types/DEC";
import { encryptString, decryptString } from "../lib";
import { Encrypted } from "../lib/types";

describe("DEC Contract", () => {
  let dec: DEC;

  const encryptedDataFactory = function (
    chiper: string,
    nonce: string,
    sha: string,
  ): Encrypted {
    return {
      chiper,
      nonce,
      sha,
    };
  };

  const taxCode = "CRVRMF12RFV4RTY7";
  const municipality = "Roma";
  const region = "Lazio";
  const country = "Italia";
  const PRIVATE_KEY =
    "0x70866392fdfd32ba237e801266da6fa25410215440dd74f576de15c9ca3814f9";

  let eTaxCode: Encrypted;
  let eMunicipality: Encrypted;
  let eRegion: Encrypted;
  let eCountry: Encrypted;

  beforeEach(async () => {
    eTaxCode = encryptString(taxCode, PRIVATE_KEY);
    eMunicipality = encryptString(municipality, PRIVATE_KEY);
    eRegion = encryptString(region, PRIVATE_KEY);
    eCountry = encryptString(country, PRIVATE_KEY);

    const DECFactory = await ethers.getContractFactory("DEC");
    dec = await DECFactory.deploy(eTaxCode, eMunicipality, eRegion, eCountry);
  });

  it("Should set initial data correctly", async () => {
    assert.equal(
      await dec.owner(),
      await (await ethers.provider.getSigner(0)).getAddress(),
    );

    const registeredTaxCode: Encrypted = await dec.taxCode();
    const registeredMunicipality: Encrypted = await dec.municipality();
    const registeredRegion: Encrypted = await dec.region();
    const registeredCountry: Encrypted = await dec.country();

    const enTaxCode = encryptedDataFactory(
      registeredTaxCode.chiper,
      registeredTaxCode.nonce,
      registeredTaxCode.sha,
    );

    const enMunicipality = encryptedDataFactory(
      registeredMunicipality.chiper,
      registeredMunicipality.nonce,
      registeredMunicipality.sha,
    );

    const enRegion = encryptedDataFactory(
      registeredRegion.chiper,
      registeredRegion.nonce,
      registeredRegion.sha,
    );

    const enCountry = encryptedDataFactory(
      registeredCountry.chiper,
      registeredCountry.nonce,
      registeredCountry.sha,
    );

    const decodedTaxCode = decryptString(
      enTaxCode.chiper,
      PRIVATE_KEY,
      enTaxCode.nonce,
    );
    const decodedMunicipality = decryptString(
      enMunicipality.chiper,
      PRIVATE_KEY,
      enMunicipality.nonce,
    );
    const decodedRegion = decryptString(
      enRegion.chiper,
      PRIVATE_KEY,
      enRegion.nonce,
    );
    const decodedCountry = decryptString(
      enCountry.chiper,
      PRIVATE_KEY,
      enCountry.nonce,
    );

    assert.equal(decodedTaxCode.message, taxCode);
    assert.equal(decodedMunicipality.message, municipality);
    assert.equal(decodedRegion.message, region);
    assert.equal(decodedCountry.message, country);
  });

  it("Should set and get tax code correctly", async () => {
    await dec.setTaxCode(eTaxCode);

    const getTaxCode = await dec.taxCode();

    const gTaxCode = encryptedDataFactory(
      getTaxCode.chiper,
      getTaxCode.nonce,
      getTaxCode.sha,
    );

    assert.equal(JSON.stringify(eTaxCode), JSON.stringify(gTaxCode));
  });

  it("Should set and get municipality correctly", async () => {
    await dec.setMunicipality(eMunicipality);

    const getMunicipality = await dec.municipality();

    const gMunicipality = encryptedDataFactory(
      getMunicipality.chiper,
      getMunicipality.nonce,
      getMunicipality.sha,
    );

    assert.equal(JSON.stringify(eMunicipality), JSON.stringify(gMunicipality));
  });

  it("Should set and get region correctly", async () => {
    await dec.setRegion(eRegion);

    const getRegion = await dec.region();

    const gRegion = encryptedDataFactory(
      getRegion.chiper,
      getRegion.nonce,
      getRegion.sha,
    );

    assert.equal(JSON.stringify(eRegion), JSON.stringify(gRegion));
  });

  it("Should set and get country correctly", async () => {
    await dec.setCountry(eCountry);

    const getCountry = await dec.country();

    const gCountry = encryptedDataFactory(
      getCountry.chiper,
      getCountry.nonce,
      getCountry.sha,
    );

    assert.equal(JSON.stringify(eCountry), JSON.stringify(gCountry));
  });
});
