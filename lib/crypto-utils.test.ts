import { encryptString, decryptString } from "./crypto-utils";
import { mockEOAs } from "./__mocks__";

describe("Crypto Utils", () => {
  const privateKey = mockEOAs[0].privateKey;

  it("should encrypt and decrypt a string", async () => {
    const originalString = "Hello, world!";
    const encryptedString = await encryptString(originalString, privateKey);

    const decryptedString = await decryptString(encryptedString, privateKey);
    expect(decryptedString).toEqual(originalString);
  });

  it("should handle decryption with incorrect private key", async () => {
    const originalString = "Hello, world!";
    const encryptedString = await encryptString(originalString, privateKey);
    const incorrectPrivateKey = "incorrectPrivateKey";

    await expect(
      decryptString(encryptedString, incorrectPrivateKey),
    ).rejects.toThrow("Error decrypting string");
  });
});
