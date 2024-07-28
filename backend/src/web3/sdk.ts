import sdk, { Account, CHAIN_CONFIG } from "@unique-nft/sdk"

export function createSdk(account: Account) : sdk {
  const Sdk = new sdk({
    baseUrl: CHAIN_CONFIG.opal.restUrl,
    account,
  })
  return Sdk
}
