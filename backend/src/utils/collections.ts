import sdk from "@unique-nft/sdk"

export async function createCollection(Sdk: sdk, address: string) {
  const { parsed, error } = await Sdk.collection.createV2({
    name: "Player Collection",
    description: "Player Collection Description",
    symbol: "PLAYER",
    permissions: { nesting: { collectionAdmin: true } },
    encodeOptions: {
      defaultPermission: {collectionAdmin: true, tokenOwner: true, mutable: true},
      overwriteTPPs: [
        {
          key: "tokenData",
          permission: {
            collectionAdmin: true,
            tokenOwner: false,
            mutable: true,
          },
        },
      ],
    },
  })

  if (error) throw Error("Error occurred while creating a collection")
  if (!parsed) throw Error("Cannot parse results")

  const { collectionId } = parsed
  const collection = await Sdk.collection.get({ collectionId })

  return collection
}
