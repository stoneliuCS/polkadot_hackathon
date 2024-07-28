import Sdk from "@unique-nft/sdk"
import { ICreatePlayerRequest } from "../types/type"

export default async function createToken(
  sdk: Sdk,
  address: string,
  collectionId: number,
  owner: string,
  attributes: ICreatePlayerRequest
) {
  const result = await sdk.token.createV2({
    address,
    collectionId,
    owner,
    attributes: [
      {
        trait_type: "name",
        value: attributes.name,
      },
      {
        trait_type: "Victories",
        value: 0,
      },
      {
        trait_type: "Defeats",
        value: 0,
      },
    ],
  })

  if (result.error) {
    console.log("Error creating token: " , result.error)
    return
  }

  const tokenId = result.parsed?.tokenId as number
  return tokenId
}
