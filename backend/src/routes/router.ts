import express, { Request, Response } from "express"
import { ICreatePlayerRequest } from "../types/type"
import { createAccount } from "../utils/account"
import { createSdk } from "../web3/sdk"
import { createCollection } from "../utils/collections"
import Sr25519Account from "@unique-nft/sr25519"
import createToken from "../utils/token"
import { PropertyKeyPermission } from "@unique-nft/sdk"
import setPermission from "../utils/permissions"

const router = express.Router()

router.post("/create-account", async (req: Request, res: Response) => {
  const data: ICreatePlayerRequest = req.body
  const account = await createAccount(data.mnemonic)
  const sdk = createSdk(account)
  const collection = await createCollection(sdk, account.address)
  const tokenId = await createToken(
    sdk,
    account.address,
    collection.id,
    collection.owner,
    data
  )
  res.send({
    statusCode: "200",
    data: {
      url: `https://uniquescan.io/opal/tokens/${collection.id}/${tokenId}`,
    },
  })
})

router.get("/create-mnemonic", async (req: Request, res: Response) => {
  return res.send({ data: Sr25519Account.generateMnemonic() })
})

export default router
