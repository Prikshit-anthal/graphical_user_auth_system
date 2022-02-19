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

//firebase commands

//update docs
//  await updateDoc(doc(db, 'finalStudentAmbassador', docIdData[i]), {
//    numberReferrals: refData[i],
//  })

//set doc
// await setDoc(doc(db, 'leads', username), {
//   name: username,
//   avatar: fileUrl,
// })

//get doc
// const stuInfo = collection(db, 'finalStudentAmbassador')
// const stuInfo_doc = await getDocs(stuInfo)
//     stuData = stuInfo_doc.docs.map((doc) => doc.data().referralCode)

//set store
// const storage = getStorage()
// const coverPhotoRef = ref(storage, `${file.name}`)
// console.log(coverPhotoRef)
// uploadBytes(coverPhotoRef, file).then((res) => {
//   getDownloadURL(coverPhotoRef).then((url) => {
//     setFileUrl(url)
//   })
//   console.log('uploaded : ' + fileUrl)
// })

//del doc and store
//  deleteDoc(doc(db1, 'blogs', timestamp))
//  const desertRef = ref(storage, `${timestamp}`)
//  deleteObject(desertRef)

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export default db
