import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCZI_CUBlTfw4CReBZKXJr2qA2TCnl_zio',
  authDomain: 'geo-ninjas-3d201.firebaseapp.com',
  databaseURL: 'https://geo-ninjas-3d201.firebaseio.com',
  projectId: 'geo-ninjas-3d201',
  storageBucket: 'geo-ninjas-3d201.appspot.com',
  messagingSenderId: '281424938226'
}

const firebaseApp = firebase.initializeApp(config)

// export firebase database
export default firebaseApp.firestore()
