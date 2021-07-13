import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyASwgTMfID_LKTzdMGe3133RVSwpdQIOUA",
  authDomain: "spartans-74787.firebaseapp.com",
  projectId: "spartans-74787",
  storageBucket: "spartans-74787.appspot.com",
  messagingSenderId: "832736985527",
  appId: "1:832736985527:web:0dafc0e99b655903cfe832",
  measurementId: "G-PXCR28TWFZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 //   Firestore storage
 const storage = firebase.storage()
 const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp
 export { firebase, storage,db,timestamp};