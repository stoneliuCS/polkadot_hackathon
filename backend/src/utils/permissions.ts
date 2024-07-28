import Sdk, { PropertyKeyPermission } from "@unique-nft/sdk"
export default async function setPermission(
  sdk: Sdk,
  address: string,
  collectionId: number,
  permissions: PropertyKeyPermission[]
) {
  const txSetPermissions =
    await sdk.collection.setPropertyPermissions.submitWaitResult({
      address,
      collectionId,
      propertyPermissions: permissions,
    })
    if (txSetPermissions.error) console.log(txSetPermissions.error); return
}
