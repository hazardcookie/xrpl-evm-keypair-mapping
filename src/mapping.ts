// Mapping an XRPL secret to an EVM key pair: Proof of Concept
// By: @hazardcookie
// 12/7/2022

import { privateToPublic, privateToAddress } from "ethereumjs-util";
import { Wallet } from "xrpl";
import { mappedWallet } from "./types/Wallet";

/*
 * Takes an xrpl secret and returns an object with both xrpl and ethereum key pairs
 * @param {string} xrplSecretKey - xrpl secret key
 * @returns {object} - object with the ethereum address and private key
 */
export default function mapXrplSecretToEvm(xrplSecretKey: string): {
  wallet: mappedWallet;
} {
  // Get the XRPL keypair from the secret
  const xrplWallet = Wallet.fromSeed(xrplSecretKey);

  // Convert the XRPL secret to hex
  const secretKeyToHex = Buffer.from(xrplSecretKey, "utf8").toString("hex");

  // Ethereum private keys are 64 characters long when represented in hex
  // After converting our XRPL secret to hex, we need to pad it with 0s to make it 64 characters
  const paddedSecretKey = secretKeyToHex.padStart(64, "0");

  // Convert the padded XRPL secret to a buffer
  // This is the private key we will use to sign transactions on the EVM
  const mappedPrivateKey = Buffer.from(paddedSecretKey, "hex");

  // Get the evm public key and public address from the mapped private key
  const publicKey = privateToPublic(mappedPrivateKey).toString("hex");
  const publicAddr = privateToAddress(mappedPrivateKey).toString("hex");

  return {
    wallet: {
      xrplAddr: `${xrplWallet.address}`,
      xrplSecret: `${xrplWallet.seed}`,
      mappedEvmPrivateKey: mappedPrivateKey.toString("hex"),
      mappedEvmPublicKey: `${publicKey}`,
      mappedEvmPublicAddr: `0x${publicAddr}`,
    },
  };
}
