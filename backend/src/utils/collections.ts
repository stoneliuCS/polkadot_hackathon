import sdk from "@unique-nft/sdk"

export async function createCollection(Sdk: sdk, address: string) {
  const { parsed, error } = await Sdk.collection.create.submitWaitResult({
    address,
    name: "Player Collection",
    description: "Player Collection Description",
    tokenPrefix: "TST",
  })

  if (error) throw Error("Error occurred while creating a collection")
  if (!parsed) throw Error("Cannot parse results")

  const { collectionId } = parsed
  const collection = await Sdk.collection.get({ collectionId })
  const nft = await Sdk.token.create({ collectionId })
  return { collection, nft }
}
