import Sr25519Account from "@unique-nft/sr25519";

export async function createAccount(mnemonic : string) {
  const account = Sr25519Account.fromUri(mnemonic);
  return account
}
