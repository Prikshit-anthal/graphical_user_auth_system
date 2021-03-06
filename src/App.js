import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Display from './components/login_user/Display'
import Login from './components/login_create_portal/Login'
import SelectImgFromTag from './components/create_update_user/SelectImgFromTag'
import InstructionPopUp from './components/Instruction_pop_up/InstructionPopUp'
import UserPanel from './components/User_Logged_In/UserPanel'
import Loader from './components/Loader/Loader'

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
      const [displayLoader,setDisplayLoader]=useState(false);

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
      <Loader display={displayLoader} />
      <Routes>
        <Route
          path='/login'
          element={<Login type={'login'} LOADER={setDisplayLoader} />}
        />
        <Route path='/' element={<InstructionPopUp />} />

        <Route
          path='/create'
          element={<Login type={'create'} LOADER={setDisplayLoader} />}
        />
        <Route
          path='/display'
          element={<Display DB_DATA={obj} LOADER={setDisplayLoader} />}
        />
        <Route
          path='/createUserPassword'
          element={<SelectImgFromTag LOADER={setDisplayLoader} DB_DATA={obj} />}
        />
        <Route
          path='/userPanel'
          element={<UserPanel LOADER={setDisplayLoader} />}
        />
      </Routes>
    </>
  )
}

export default App
