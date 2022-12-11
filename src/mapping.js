// Mapping an XRPL secret to an EVM key pair: Proof of Concept
// By: @hazardcookie
// 12/7/2022

const EthUtil = require('ethereumjs-util');
const xrpl = require('xrpl');

/*
    * Takes an xrpl secret and returns an object with both xrpl and ethereum key pairs
    * @param {string} xrplSecretKey - xrpl secret key
    * @returns {object} - object with the ethereum address and private key
*/
function mapXrplSecretToEvm(xrplSecretKey) { 
    // Get the XRPL keypair from the secret
    const xrplWallet = xrpl.Wallet.fromSeed(xrplSecretKey);

    // Convert the XRPL secret to hex
    const secretKeyToHex = Buffer.from(xrplWallet.seed, 'utf8').toString('hex').toUpperCase();

    // Ethereum private keys are 64 characters long when represented in hex
    // After converting our XRPL secret to hex, we need to pad it with 0s to make it 64 characters
    const paddedSecretKey = secretKeyToHex.padStart(64, '0');

    // Convert the padded XRPL secret to a buffer
    // This is the private key we will use to sign transactions on the EVM
    const mappedPrivateKey = Buffer.from(paddedSecretKey, 'hex');

    // Get the evm public key and public address from the mapped private key
    const publicKey = EthUtil.privateToPublic(mappedPrivateKey).toString("hex");
    const publicAddr = EthUtil.privateToAddress(mappedPrivateKey).toString("hex");

    return {
        xrplAddr: `${xrplWallet.address}`,
        xrplSecret: `${xrplWallet.seed}`,
        mappedPrivateKey: mappedPrivateKey.toString('hex'),
        mappedPublicKey: `${publicKey}`,
        mappedPublicAddr: `0x${publicAddr}`
    }
}

// export the function
module.exports = mapXrplSecretToEvm;
