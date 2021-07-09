import * as firebase from "firebase";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyAC8f0HO8qfSbzd62Y3YMx-RjwVtdQ2Niw",
    authDomain: "twins-1510051632542.firebaseapp.com",
    databaseURL: "https://twins-1510051632542.firebaseio.com",
    projectId: "twins-1510051632542",
    storageBucket: "twins-1510051632542.appspot.com",
    messagingSenderId: "292260052801",
    appId: "1:292260052801:web:ec991114a9ff5d5f8a2bc0"
};

firebase.initializeApp(config);

export default firebase.firestore();
