import { validate, Wallet, xrpToDrops } from 'xrpl'
import { saveData, signSubmitAndWait } from './utils'

// Bridge the XRPL wallet to the EVM sidechain
export async function bridge(wallet: Wallet, evmWalletAddress: string, amount: string) {
  const transactionSetup = {
    TransactionType: 'Payment',
    Account: wallet.address,
    Amount: xrpToDrops(amount),
    Destination: 'radjmEZTb4zsyNUJGV4gcVPXrFTJAuskKa',
    Memos: [
      {
        Memo: {
          MemoData: Buffer.from(evmWalletAddress, 'utf8').toString('hex').toUpperCase(),
        },
      },
    ],
  }

  //validate(transactionSetup)
  const submit = await signSubmitAndWait(transactionSetup, wallet)
  saveData(submit, './data/bridgeTx.json')

  console.log(
    `View your mapped EVM sidechain wallet: \n https://evm-sidechain.xrpl.org/address/${evmWalletAddress} \n
    Note: It may take a few minutes for the transaction to appear on the explorer.`,
  )

  return submit
}
