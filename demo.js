/*
    * This file will generate a random XRPL secret and map it to an EVM keypair
    * Every time you run this file, you will get a new XRPL secret and EVM keypair
    * This is a proof of concept and should not be used in production
    * By: @hazardcookie
    * 12/7/2022
*/

// Import ripple-keypairs to generate XRPL random secrets
const rippleKeypairs = require('ripple-keypairs');

// Import mappping function
const mapXrplSecretToEvm = require('./src/mapping');

// Generate a random XRPL secret
// Algorithm options: ed25519 or ecdsa-secp256k1
const xrplSecret = rippleKeypairs.generateSeed( { algorithm: "ecdsa-secp256k1" } );

// Map the XRPL secret to an EVM keypair
const evmKeypair = mapXrplSecretToEvm(xrplSecret);
console.log(evmKeypair);