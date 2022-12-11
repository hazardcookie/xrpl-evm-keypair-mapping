# Xrpl-Evm-Keypair-Mapping: Proof of Concept 

This is a simple proof of concept (POC) for mapping XRPL secrets to Ethereum key pairs. It is not intended for production use. 

## Overview
Recently there has been a lot of exciting discussion about the XRPL EVM sidechain and the devnet launch. Currently, in order to access the EVM sidechain you need to maintain separate wallets, one for the XRPL side and one for the EVM side. This is because the XRPL and EVM use different key pairs and address formats.

It's not a great user experience tbh. So.. what can be done? One potential solution could be mapping XRPL secret keys to Ethereum key pairs. This would allow users to use their XRPL secret to generate an Ethereum address, and use that address to interact with Ethereum smart contracts on the EVM sidechain. This would allow for seamless integration between the XRPL and EVM sidechains from the perspective of the user.

## How it works
Ethereum based wallets are typically generated from a 12 word mnemonic phrase. This phrase is used to generate a private key, which is then used to generate a public key. The public key is then used to generate an Ethereum address. 

This POC maps an XRPL secret key to an Ethereum private key. It does not use a mnemonic phrase, but instead uses the XRPL secret directly. The idea here is: If you have generated an XRPL seed from a sufficient source of randomness, then it should be safe to use that seed to generate a corresponding Ethereum private key.

Ethereum private keys can be represented as a 64 character hex string. To map an XRPL secret to a valid Ethereum private key, the XRPL secret is converted to a hex string and padded with leading zeros to 64 characters. 

To accomplish this, the POC uses the following steps:
1. Convert the base58 encoded XRPL secret to a hex string
2. Pad the hex string with leading zeros to 64 characters
3. Convert the hex string to a byte array
4. Use the byte array as the private key for an Ethereum key pair
5. Use the Ethereum key pair to generate an Ethereum address

## Usage
1. Clone the repo
2. Run `npm install`
3. Run demo script `node demo.js`

To see the mapping function in action, run `node demo.js`. This will generate a random XRPL secret, map it to an Ethereum key pair, and print the results to the console.

The actual mapping function is in `src/mapping.js`. It takes an XRPL secret as a string and returns an object containing the XRPL address, XRPL secret, Ethereum private key, Ethereum public key, and Ethereum address.

## Example Mapping Output
```
{
    "xrplAddr": "rwds3Lq7xddDC71tHB4sgkoQWKG3vKppRt",
    "xrplSecret": "shuJBYq7r1BeH614xBirQgrWRNfkL",
    "mappedPrivateKey": "0000007368754a4259713772314265483631347842697251677257524e666b4c",
    "mappedPublicKey": "23f9c34aba8fa64fdd864b3ed28f81d455aa22764afd0038fde02baba729ab5504a4c3a6a17c21a5d9c921af0f74147f736f86fc51b1e62c494faf98768fe48d",
    "mappedPublicAddr": "0x09260f09b3cffa60ecf215c3372507abb06de67b"
}
```
