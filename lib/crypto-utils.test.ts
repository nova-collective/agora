import { encryptString, decryptString, getHash } from "./crypto-utils";
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

  it("should return a SHA hash for a given message", () => {
    const message = "Hello, world!";
    const expectedHash =
      "f345a219da005ebe9c1a1eaad97bbf38a10c8473e41d0af7fb617caa0c6aa722";

    const result = getHash(message);

    expect(result).toEqual({ hash: expectedHash });
  });
});
