import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
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
// firebaseApp.firestore().settings({timestampsInSnapshots:true});
export default firebaseApp.firestore();
