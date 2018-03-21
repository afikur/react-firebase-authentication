import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA3lc3k7CdxH0cf9AmLs_LteCg4WgUFDWg",
  authDomain: "react-firebase-authentic-6ba41.firebaseapp.com",
  databaseURL: "https://react-firebase-authentic-6ba41.firebaseio.com",
  projectId: "react-firebase-authentic-6ba41",
  storageBucket: "react-firebase-authentic-6ba41.appspot.com",
  messagingSenderId: "143509303314"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};