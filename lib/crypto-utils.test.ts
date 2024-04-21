import { encryptString, decryptString } from "./crypto-utils";
import { mockEOAs } from "./__mocks__";

describe("Crypto Utils", () => {
  const privateKey = mockEOAs[0].privateKey;

  it("should encrypt and decrypt a string", () => {
    const originalString = "Hello, world!";
    const encryptedString = encryptString(originalString, privateKey);

    const decryptedString = decryptString(
      encryptedString.chiper,
      privateKey,
      encryptedString.nonce,
    );
    expect(decryptedString.message).toEqual(originalString);
  });

  it("should handle decryption with incorrect private key", async () => {
    const originalString = "Hello, world!";
    const encryptedString = encryptString(originalString, privateKey);
    const incorrectPrivateKey = "incorrectPrivateKey";
    try {
      decryptString(
        encryptedString.chiper,
        incorrectPrivateKey,
        encryptedString.nonce,
      );
    } catch (e: any) {
      expect(e.message).toBe("Error decrypting string");
    }
  });
});
