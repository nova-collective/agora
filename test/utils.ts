import { ethers } from "hardhat";

/**
 * This function generates a mock address
 *
 * @returns {string} - a random mock address
 */
export function generateMockAddress(): string {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
}
