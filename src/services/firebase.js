// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection, addDoc ,serverTimestamp } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import config from "../config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(config.ReCaptchaV3SiteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

console.log("ReCaptcha activated")

const analytics = getAnalytics(app);
const db = getFirestore();



async function write(name,phone,vaccinated){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      phone: phone,
      vaccinated: vaccinated,
      createdAt: serverTimestamp()
    });

    return docRef.id;
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export default {write};
