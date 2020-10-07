import * as firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "../config/firebase.config";

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
  return app;
}

export function getFirestore() {
  return firebase.firestore(app);
}
