import { store } from "./firebase";
import { Config } from "./config";
import { AccountDetails } from "../commons/types";

import { ethers } from "ethers";

export class LockStore {
  static async lock(lockId: string): Promise<boolean> {
    try {
      await store.Lock.doc(lockId).create({ timestamp: new Date() });
      return true;
    } catch (error) {
      const lck = await store.Lock.doc(lockId).get();
      if (lck.exists) {
        const now = new Date();
        const lockTime = (lck.data() as any)["timestamp"]["seconds"] * 1000;
        if (now.getTime() - lockTime > Config.lockPeriod) {
          LockStore.release(lockId);
        }
      }
      return false;
    }
  }

  static async release(lockId: string) {
    try {
      await store.Lock.doc(lockId).delete();
    } catch (error) {
      console.log(error);
    }
  }
}

export class AccountStore {
  static async storeAccount(account: AccountDetails): Promise<string> {
    const accountHash = ethers.encodeBytes32String(
      account.name + account.number
    );
    account.address = account.address.toLocaleLowerCase();
    console.log(account);
    
    await store.Account.doc(accountHash).set(account);
    return accountHash;
  }

  static async getAddressAccounts(address: string): Promise<AccountDetails[]> {
    const accounts = await store.Account.where(
      "address",
      "==",
      address.toLocaleLowerCase()
    ).get();
    return accounts.docs.map((a) => a.data() as AccountDetails);
  }

  static async getHashAccount(hash: string): Promise<AccountDetails> {
    return (await store.Account.doc(hash).get()).data() as AccountDetails;
  }
}
