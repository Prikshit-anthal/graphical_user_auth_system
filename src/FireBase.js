import 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAO77sxEzCr4eKpC3svJ1VTogNNl4EIMQw',
  authDomain: 'graphicalauth.firebaseapp.com',
  projectId: 'graphicalauth',
  storageBucket: 'graphicalauth.appspot.com',
  messagingSenderId: '718434224611',
  appId: '1:718434224611:web:3ef54e446971e6eede38d6',
  measurementId: 'G-XLY1TPJ47P',
}



const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export default db
