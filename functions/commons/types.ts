export enum CollectionNames {
  Account = "Account",
  Config = "Config",
  Lock = "Lock",
}

export type AccountDetails = {
  name: string;
  number: string;
  address: string;
  hash?: string;
}