// @ts-ignore
import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCcjtdl2aszQnIX8H6sMYrECIOVuhilK1k",
  authDomain: "test-34ced.firebaseapp.com",
  projectId: "test-34ced",
  storageBucket: "test-34ced.appspot.com",
  messagingSenderId: "329485395162",
  appId: "1:329485395162:web:0dcebba51b0650b1bd71e3",
  measurementId: "G-5X84WV413Z",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
