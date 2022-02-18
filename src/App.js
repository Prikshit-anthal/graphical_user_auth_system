import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Display from './Display'
import './App.css'
import Login from './Login'
import SelectImgFromTag from './components/SelectImgFromTag'
import { DATA_FROM_DB } from './constants'
import db from './FireBase'
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  collection,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  where,
  query,
} from 'firebase/firestore'

 

function App() {

  let tempTag = [],
    tempImg = [],
    tempStorePaths = [],
    tempTimeStamps = []


      const [images, setImages] = useState([])
      const [tagNames, setTagNames] = useState([])
      const [checker, setChecker] = useState(false)
      const [storePaths, setStorePaths] = useState([])
      const [timeStamps, setTimeStamps] = useState([])

       async function DATA_FROM_DB() {
         const imagesInfo = collection(db, 'images')
         const imagesDocs = await getDocs(imagesInfo)
         var check = imagesDocs.docs.map((doc) => {
           // tagNames.push(doc.data().name);
           tempTag.push(doc.data().name)
           if (doc.data().imgUrl !== undefined) tempImg.push(doc.data().imgUrl)
           else tempImg.push([])
           if (doc.data().storagePath !== undefined)
             tempStorePaths.push(doc.data().storagePath)
           else tempStorePaths.push([])
           if (doc.data().timeStamps !== undefined)
             tempTimeStamps.push(doc.data().timeStamps)
           else tempTimeStamps.push([])

           return true
         })

         setTimeStamps(tempTimeStamps)
         setImages(tempImg)
         setTagNames(tempTag)
         setStorePaths(tempStorePaths)

         //  console.log(tempImg)
         //  console.log(tempTag)
         //  console.log(tempStorePaths)
         //  return [tempImg, tempTag, tempStorePaths, tempTimeStamps]
       }

useLayoutEffect(() => {
 
  DATA_FROM_DB();
},[])

const obj = {
    images: images,
    setImages: setImages,
    tagNames: tagNames,
    setTagNames: setTagNames,
    checker: checker,
    setChecker: setChecker,
    storePaths: storePaths,
    setStorePaths: setStorePaths,
    timeStamps: timeStamps,
    setTimeStamps: setTimeStamps,
  }
  // console.log(COMMON_DB_DATA)



  return (
    <>
      <Routes>
        <Route path='/' element={<Login type={'login'} />} />
        <Route path='/create' element={<Login type={'create'} />} />
        <Route path='/display' element={<Display DB_DATA={obj} />} />
        <Route path='/createUserPassword' element={<SelectImgFromTag DB_DATA={obj} />} />
      </Routes>
    </>
  )
}

export default App
