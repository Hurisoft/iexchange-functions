import { store } from "./firebase";
import { Config } from "./config";

export class LockStore {
    static async lock(lockId: string): Promise<boolean> {
        try {
            await store.Lock.doc(lockId).create({ timestamp: new Date() });
            return true;
        } catch (error) {
            const lck = await store.Lock.doc(lockId).get();
            if (lck.exists) {
                const now = new Date();
                const lockTime = (lck.data() as any)['timestamp']['seconds'] * 1000;
                if ((now.getTime() - lockTime) > Config.lockPeriod) {
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
    
}