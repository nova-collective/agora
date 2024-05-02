/**
 * This library expose a set of utilities that help with cryptographic tasks.
 * Some data in the smart contracts needs to be sent encrypted (e.g. DEC) because contains personal sensitive information.
 *
 * The reason why the encryption is done before to send the data to the smart contract (and not in the smart contract itself)
 * is because If we send the data and then encrypt it in solidity, the data will be visible in the transaction that
 * in the first place was used to send the data to the contract. Also, solidity doesn't have a function to encrypt.
 */
import { Encrypted, Decrypted, Hash } from "./types";
import { execSync, ExecSyncOptionsWithStringEncoding } from "child_process";
import * as path from "path";

/**
 * This function encrypt a string by using a private key possibly from an EOA (Voter's account).
 * The function generates a public key from the private key given in input and then uses the public key
 * to encrypt the string.
 *
 * @param {string} decryptedString - the string to be encrypted
 * @param {string} privateKey - a private key, e.g. from the EOA
 * @returns {Encrypted} - the encrypted output string
 */
export function encryptString(
  decryptedString: string,
  privateKey: string,
): Encrypted {
  try {
    const execSyncOptions = {
      stdio: "pipe",
    } as ExecSyncOptionsWithStringEncoding;

    if (privateKey.startsWith("0x")) {
      privateKey = privateKey.substring(2);
    }

    const cryptoPyPath = getCryptoPyPath();

    const encrypted = execSync(
      `cd ${cryptoPyPath} && python3 -m crypto AESGCM_encrypt --key="${privateKey}" --secret="${decryptedString}"`,
      execSyncOptions,
    );

    const response: Encrypted = JSON.parse(encrypted.toString());
    response.hash = getHash(decryptedString).hash;

    return response;
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
 * @param {string}  nonce - The nonce value used for the encryption
 * @returns {Decrypted} - the string decrypted
 */
export function decryptString(
  encryptedString: string,
  privateKey: string,
  nonce: string,
): Decrypted {
  try {
    const execSyncOptions = {
      stdio: "pipe",
    } as ExecSyncOptionsWithStringEncoding;

    if (privateKey.startsWith("0x")) {
      privateKey = privateKey.substring(2);
    }

    const cryptoPyPath = getCryptoPyPath();
    const decrypted = execSync(
      `cd ${cryptoPyPath} && python3 -m crypto AESGCM_decrypt --key=${privateKey} --nonce=${nonce} --chiper=${encryptedString}`,
      execSyncOptions,
    );

    const response: Decrypted = JSON.parse(decrypted.toString());

    return response;
  } catch (e) {
    throw new Error("Error decrypting string");
  }
}

export function getHash(message: string): Hash {
  try {
    const execSyncOptions = {
      stdio: "pipe",
    } as ExecSyncOptionsWithStringEncoding;

    const cryptoPyPath = getCryptoPyPath();
    const hashed = execSync(
      `cd ${cryptoPyPath} && python3 -m crypto sha3_256 --input="${message}"`,
      execSyncOptions,
    );

    const response: Hash = JSON.parse(hashed.toString());

    return response;
  } catch (e: any) {
    throw new Error("Error hashing the message");
  }
}

/**
 *  For the ballot encryption must be implemented a threshold homomorphic encryption in order
 *  to produce a number of shares of the private_key to distribute across different electoral authorities.
 *  The shares of the private_key are used together to decrypt the electoral results.
 *
 *  Such protocol avoids that a single actor which posses the private_key can decrypt a single ballot.
 *  Anyway there are no threshold homomorphic implementations ready to be used. In this case we proceed using a
 *  partially homomorphic encryption scheme, with a classical public/private keys pair.
 *  It is important to note that the private key can decrypt the ballot in this case: don't use this software in
 *  production.
 */

/**
 * The crypto-py library should be manually copy-pasted (or git cloned) inside the lib folder.
 * Linux and MacOS users can in alternative create a symbolic link.
 * After that, activate the python venv in the crypto-py folder, e.g. for linux: source venv/bin/activate
 *
 * @returns {string} - the absolute path of the crypto-py library
 */
function getCryptoPyPath() {
  const cryptoRelativePath = path.join("lib", "crypto-py");
  return path.resolve(cryptoRelativePath);
}
