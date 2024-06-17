import * as admin from "firebase-admin";
import {CollectionNames} from "../commons/types";
admin.initializeApp();

export const store = {
  [CollectionNames.Reward]: admin.firestore().collection(CollectionNames.Reward),
  [CollectionNames.Config]: admin.firestore().collection(CollectionNames.Config),
  [CollectionNames.Offer]: admin.firestore().collection(CollectionNames.Offer),
  [CollectionNames.Lock]: admin.firestore().collection(CollectionNames.Lock),
  [CollectionNames.Token]: admin.firestore().collection(CollectionNames.Token),
};

export const firebaseAuth = admin.auth();