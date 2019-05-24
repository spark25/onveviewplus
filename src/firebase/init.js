import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCGkzqH1-CsDKnzfEsyBNp8FfOwceC3jY",
  authDomain: "oneviewplus.firebaseapp.com",
  databaseURL: "https://oneviewplus.firebaseio.com",
  projectId: "oneviewplus",
  storageBucket: "oneviewplus.appspot.com",
  messagingSenderId: "368278850309",
  appId: "1:368278850309:web:ef773a969ef77cd8"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();
let auth = firebaseApp.auth();
// firebaseApp.firestore().settings({timestampsInSnapshots:true});
export default{ db, auth };
