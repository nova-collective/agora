/**
 * This library expose a set of utilities that help with cryptographic tasks.
 * Some data in the smart contracts needs to be sent encrypted (e.g. DEC) because contains personal sensitive information.
 *
 * The reason why the encryption is done before to send the data to the smart contract (and not in the smart contract itself)
 * is because If we send the data and then encrypt it in solidity, the data will be visible in the transaction that
 * in the first place was used to send the data to the contract. Also, solidity doesn't have a function to encrypt.
 */
import { Encrypted, Decrypted } from "./types";
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
      `cd ${cryptoPyPath} && python3 Crypto.py AESGCM_encrypt --key="${privateKey}" --secret="${decryptedString}"`,
      execSyncOptions,
    );

    const en = encrypted.toString().split("\n");
    const chiper = en[0].split(" ")[1];
    const nonce = en[1].split("  ")[1];

    return {
      chiper,
      nonce,
    };
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
      `cd ${cryptoPyPath} && python3 Crypto.py AESGCM_decrypt --key=${privateKey} --nonce=${nonce} --chiper=${encryptedString}`,
      execSyncOptions,
    );

    const de = decrypted.toString().split("\n");
    const message = de[0].substring(
      de[0].indexOf("message: ") + "message: ".length,
    );

    return { message };
  } catch (e) {
    throw new Error("Error decrypting string");
  }
}

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
