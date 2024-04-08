/**
 * This library expose a set of utilities that help with cryptographic tasks.
 * Some data in the smart contracts needs to be sent encrypted (e.g. DEC) because contains personal sensitive information.
 *
 * The reason why the encryption is done before to send the data to the smart contract (and not in the smart contract itself)
 * is because If we send the data and then encrypt it in solidity, the data will be visible in the transaction that
 * in the first place was used to send the data to the contract. Also, solidity doesn't have a function to encrypt.
 */
import * as EthCrypto from "eth-crypto";
import { Encrypted } from "eth-crypto";

/**
 * This function encrypt a string by using a private key possibly from an EOA (Voter's account).
 * The function generates a public key from the private key given in input and then uses the public key
 * to encrypt the string.
 *
 * @param {string} decryptedString - the string to be encrypted
 * @param {string} privateKey - a private key, e.g. from the EOA
 * @returns {Promise<Encrypted>} - the encrypted output string
 */
export async function encryptString(
  decryptedString: string,
  privateKey: string,
): Promise<Encrypted> {
  try {
    const publicKey = await EthCrypto.publicKeyByPrivateKey(privateKey);

    const encrypted = await EthCrypto.encryptWithPublicKey(
      publicKey,
      decryptedString,
    );
    return encrypted;
  } catch (e) {
    console.error(e);
    throw new Error("Error encrypting string");
  }
}

/**
 * This function decrypt a string using the private key possibly from an EOA.
 *
 * @param {Encrypted} encryptedString - the secret to decrypt
 * @param {string}  privateKey - A private key possibly from an EOA
 * @returns {Promise<string>} - the string decrypted
 */
export async function decryptString(
  encryptedString: Encrypted,
  privateKey: string,
): Promise<string> {
  try {
    const decrypted = await EthCrypto.decryptWithPrivateKey(
      privateKey,
      encryptedString,
    );
    return decrypted;
  } catch (e) {
    console.error(e);
    throw new Error("Error decrypting string");
  }
}
