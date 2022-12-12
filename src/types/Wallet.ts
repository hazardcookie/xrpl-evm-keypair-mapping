export interface XrplWallet {
  xAddress: string;
  secret: string;
  classicAddress: string;
  address: string;
}

export interface mappedWallet {
  xrplAddr: string;
  xrplSecret: string;
  mappedEvmPrivateKey: string;
  mappedEvmPublicKey: string;
  mappedEvmPublicAddr: string;
}
