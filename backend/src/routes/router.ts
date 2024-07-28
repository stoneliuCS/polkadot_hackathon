import express, { Request, Response } from "express"
import { ICreatePlayerRequest } from "../types/type"
import { createAccount } from "../utils/account"
import { createSdk } from "../web3/sdk"
import { createCollection } from "../utils/collections"

const router = express.Router()

router.post("/create-account", async (req: Request, res: Response) => {
  const data: ICreatePlayerRequest = req.body
  const account = await createAccount(data.mnemonic)
  const sdk = createSdk(account)
  const addressAccount = account.address
  const { address, availableBalance, lockedBalance, freeBalance } =
    await sdk.balance.get({ address: addressAccount })
  const { collection, nft } = await createCollection(sdk, account.address)
  // console.log(account.address)
})

export default router
