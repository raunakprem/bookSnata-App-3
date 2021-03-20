import * as firebase from 'firebase'
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDKP7I99Ck2GK57AtQRPiUE-2YVZMsYykg",
  authDomain: "book-santa-61d21.firebaseapp.com",
  projectId: "book-santa-61d21",
  storageBucket: "book-santa-61d21.appspot.com",
  messagingSenderId: "362912480488",
  appId: "1:362912480488:web:bdf448dd87c066ec455d5d",
  measurementId: "G-GHM3H5VM4E"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();