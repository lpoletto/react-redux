import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaQ9EOXY1AQTEhscGhyoITH_U0EU4HAWM",
    authDomain: "react-firebase-login-36b9e.firebaseapp.com",
    databaseURL: "https://react-firebase-login-36b9e.firebaseio.com",
    projectId: "react-firebase-login-36b9e",
    storageBucket: "react-firebase-login-36b9e.appspot.com",
    messagingSenderId: "1009251232553",
    appId: "1:1009251232553:web:1d7eef49cbb2ff4eae2538",
    measurementId: "G-H5JYBY7588"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db,firebase};