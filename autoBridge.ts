/*
 * Note: This is a proof of concept and should not be used in production
 * Note: The devnet bridge is still in development and is not always online
 * This script will generate a funded XRPL devnet wallet, then it maps it to an EVM keypair
 * It then bridges the XRPL wallet to the EVM sidechain
 * By: @hazardcookie
 * 12/12/2022
 */

import { generateFundedWallet } from "@thebettermint/xrpl-auto-funder";
import { Wallet } from "xrpl";
import { bridge } from "./src/bridge";
import mapXrplSecretToEvm from "./src/mapping";
import { saveData } from "./src/utils";

// Generate funded XRPL devnet wallet
const devnetFaucet = async () => {
  let wallet = await generateFundedWallet("devnet");
  saveData(wallet, "./data/devnetWallet.json");
  return wallet;
};

const main = async () => {
  // Get the funded XRPL devnet wallet
  const devnetWallet = await devnetFaucet();

  // Get the XRPL keypair from the secret
  const XrplWallet = Wallet.fromSeed(devnetWallet.account.secret);

  // Map the XRPL secret to an EVM keypair
  const mapped = mapXrplSecretToEvm(devnetWallet.account.secret);

  // Save the mapped wallet to json file
  saveData(mapped, "./data/mappedWallet.json");

  // print the mapped wallet object values
  console.log("Mapped wallet:");
  console.log(mapped.wallet);

  bridge(XrplWallet, mapped.wallet.mappedEvmPublicAddr.toLowerCase(), "900");
};

main();
