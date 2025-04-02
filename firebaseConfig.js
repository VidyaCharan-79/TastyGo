
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSGb2VOxSHThlV1OV_Tk0RPGYYthOg7Lo",
  authDomain: "food-app-62f1e.firebaseapp.com",
  projectId: "food-app-62f1e",
  storageBucket: "food-app-62f1e.appspot.com",
  messagingSenderId: "496580291650",
  appId: "1:496580291650:web:55b9d2d6f3188786c251db"
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
export {app, db};
const auth=getAuth(app);
export {auth};