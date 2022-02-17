import React, { useState } from 'react'
import Nav from './components/Nav'
import { useLayoutEffect } from 'react'
import SetPictorialData from './components/SetPictorialData'
import ShowPictorialData from './components/ShowPictorialData'
import SelectImgFromTag from './components/SelectImgFromTag'
import Login from './Login'

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
} from 'firebase/firestore'

function Display() {
  const [images, setImages] = useState([])
  const [tagNames, setTagNames] = useState([])
  const [checker, setChecker] = useState(false)
  const [storePaths,setStorePaths]=useState([])
  const [timeStamps,setTimeStamps]=useState([])
 

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
  const [navOption, setNavOption] = useState('user')

  async function getImages() {
    // get doc
    let tempTag = [],
      tempImg = [],
      tempStorePaths = [],
      tempTimeStamps=[]
    const imagesInfo = collection(db, 'images')
    const imagesDocs = await getDocs(imagesInfo)
    var check = imagesDocs.docs.map((doc) => {
      // tagNames.push(doc.data().name);
      tempTag.push(doc.data().name)
      if (doc.data().imgUrl !== undefined) tempImg.push(doc.data().imgUrl)
      else tempImg.push([])
      if (doc.data().storagePath !== undefined) tempStorePaths.push(doc.data().storagePath)
      else tempStorePaths.push([])
      if(doc.data().timeStamps!== undefined) tempTimeStamps.push(doc.data().timeStamps)
      else tempTimeStamps.push([])

      return true
    })

    setTimeStamps(tempTimeStamps)
    setImages(tempImg)
    setTagNames(tempTag)
    setStorePaths(tempStorePaths)

    console.log(tempImg)
    console.log(tempTag)
    console.log(tempStorePaths)
  }

  useLayoutEffect(() => {
    getImages()
  }, [checker])

  console.log(tagNames)
  return (
    <>
      {/* <Nav navOption={navOption} setNavOption={setNavOption} />
      <div className='ml-64 m-4 '>
        <div className='ml-4'>
          <SetPictorialData poop={obj}></SetPictorialData>
          <ShowPictorialData poop={obj}></ShowPictorialData> 
         
        </div>
      </div> */}
      <SelectImgFromTag poop={obj} />
     
    </>
  )
}

export default Display
