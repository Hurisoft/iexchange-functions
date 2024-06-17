import * as admin from "firebase-admin";
import {CollectionNames} from "../commons/types";
admin.initializeApp();

export const store = {
  [CollectionNames.Config]: admin.firestore().collection(CollectionNames.Config),
  [CollectionNames.Account]: admin.firestore().collection(CollectionNames.Account),
  [CollectionNames.Lock]: admin.firestore().collection(CollectionNames.Lock),
};

export const firebaseAuth = admin.auth();