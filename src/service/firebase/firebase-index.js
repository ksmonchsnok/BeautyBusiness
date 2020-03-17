import firebase from 'firebase/app'
import 'firebase/auth'
import config from './firebase-config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase.auth()