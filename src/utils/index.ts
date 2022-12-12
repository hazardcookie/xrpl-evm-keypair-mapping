import { writeFile } from 'fs'

import { Client } from 'xrpl'

// Save response data to file
export async function saveData(data: any, path: string) {
  const preparedData = JSON.stringify(data, null, 2)
  writeFile(path, preparedData, (err: any) => {
    if (err) throw err
  })
}

// Helper function for submiting transactions to the AMM devnet
export async function signSubmitAndWait(transaction: any, wallet: any) {
  const client = new Client('wss://s.devnet.rippletest.net:51233')
  await client.connect()

  const ts_prepared = await client.autofill(transaction)
  const ts_signed = wallet.sign(ts_prepared)

  console.log(`Submitting ${transaction.TransactionType} transaction.`)
  const ts_result = await client.submitAndWait(ts_signed.tx_blob)

  // @ts-ignore
  if (ts_result.result.meta.TransactionResult == 'tesSUCCESS') {
    console.log(`Bridge transaction succeeded: \n https://devnet.xrpl.org/transactions/${ts_signed.hash}`)
    client.disconnect()
    return ts_result
  } else {
    console.log(
      // @ts-ignore
      `Error sending transaction: ${ts_result.result.meta.TransactionResult}`,
    )
    client.disconnect()

    // @ts-ignore
    return ts_result.result.meta.TransactionResult
  }
}
