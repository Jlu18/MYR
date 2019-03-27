import firebase from 'firebase';
import '@firebase/firestore';

var config = {
  apiKey: "AIzaSyBLnha_cHiHuJGWla5B73vKgz1feTkgXbc",
  authDomain: "myrjsecg.firebaseapp.com",
  databaseURL: "https://myrjsecg.firebaseio.com",
  projectId: "myrjsecg",
  storageBucket: "gs://myrjsecg.appspot.com",
  messagingSenderId: "967963389163"
};

firebase.initializeApp(config);
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
export const auth = firebase.auth();
export const db = firebase.firestore();
export const scenes = db.collection('scenes');
export const snaps = db.collection('snaps');
export const storageRef = firebase.storage().ref();
