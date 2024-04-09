import { assert } from "chai";
import { ethers } from "hardhat";
import { DEC } from "../typechain-types/DEC";
import { encryptString, decryptString } from "../lib";
import { Encrypted } from "eth-crypto";

describe("DEC Contract", () => {
  let dec: DEC;

  const encryptedDataFactory = function (
    iv: string,
    ephemPublicKey: string,
    ciphertext: string,
    mac: string,
  ): Encrypted {
    return {
      iv,
      ephemPublicKey,
      ciphertext,
      mac,
    };
  };

  const taxCode = "12345678901";
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
    eTaxCode = await encryptString(taxCode, PRIVATE_KEY);
    eMunicipality = await encryptString(municipality, PRIVATE_KEY);
    eRegion = await encryptString(region, PRIVATE_KEY);
    eCountry = await encryptString(country, PRIVATE_KEY);
    const DECFactory = await ethers.getContractFactory("DEC");
    dec = await DECFactory.deploy(eTaxCode, eMunicipality, eRegion, eCountry);
  });

  it("Should set initial data correctly", async () => {
    assert.equal(
      await dec.owner(),
      await (await ethers.provider.getSigner(0)).getAddress(),
    );

    const registeredTaxCode = await dec.getTaxCode();
    const registeredMunicipality = await dec.getMunicipality();
    const registeredRegion = await dec.getRegion();
    const registeredCountry = await dec.getCountry();

    const enTaxCode = encryptedDataFactory(
      registeredTaxCode[0],
      registeredTaxCode[1],
      registeredTaxCode[2],
      registeredTaxCode[3],
    );

    const enMunicipality = encryptedDataFactory(
      registeredMunicipality[0],
      registeredMunicipality[1],
      registeredMunicipality[2],
      registeredMunicipality[3],
    );

    const enRegion = encryptedDataFactory(
      registeredRegion[0],
      registeredRegion[1],
      registeredRegion[2],
      registeredRegion[3],
    );

    const enCountry = encryptedDataFactory(
      registeredCountry[0],
      registeredCountry[1],
      registeredCountry[2],
      registeredCountry[3],
    );

    const decodedTaxCode = await decryptString(enTaxCode, PRIVATE_KEY);
    const decodedMunicipality = await decryptString(
      enMunicipality,
      PRIVATE_KEY,
    );
    const decodedRegion = await decryptString(enRegion, PRIVATE_KEY);
    const decodedCountry = await decryptString(enCountry, PRIVATE_KEY);

    assert.equal(decodedTaxCode, taxCode);
    assert.equal(decodedMunicipality, municipality);
    assert.equal(decodedRegion, region);
    assert.equal(decodedCountry, country);
  });

  it("Should set and get tax code correctly", async () => {
    await dec.setTaxCode(eTaxCode);

    const getTaxCode = await dec.getTaxCode();

    const gTaxCode = encryptedDataFactory(
      getTaxCode[0],
      getTaxCode[1],
      getTaxCode[2],
      getTaxCode[3],
    );

    assert.equal(JSON.stringify(eTaxCode), JSON.stringify(gTaxCode));
  });

  it("Should set and get municipality correctly", async () => {
    await dec.setMunicipality(eMunicipality);

    const getMunicipality = await dec.getMunicipality();

    const gMunicipality = encryptedDataFactory(
      getMunicipality[0],
      getMunicipality[1],
      getMunicipality[2],
      getMunicipality[3],
    );

    assert.equal(JSON.stringify(eMunicipality), JSON.stringify(gMunicipality));
  });

  it("Should set and get region correctly", async () => {
    await dec.setRegion(eRegion);

    const getRegion = await dec.getRegion();

    const gRegion = encryptedDataFactory(
      getRegion[0],
      getRegion[1],
      getRegion[2],
      getRegion[3],
    );

    assert.equal(JSON.stringify(eRegion), JSON.stringify(gRegion));
  });

  it("Should set and get country correctly", async () => {
    await dec.setCountry(eCountry);

    const getCountry = await dec.getCountry();

    const gCountry = encryptedDataFactory(
      getCountry[0],
      getCountry[1],
      getCountry[2],
      getCountry[3],
    );

    assert.equal(JSON.stringify(eCountry), JSON.stringify(gCountry));
  });
});
