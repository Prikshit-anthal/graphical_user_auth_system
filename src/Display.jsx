import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import { useLayoutEffect } from 'react'
import SetPictorialData from './components/SetPictorialData'
import ShowPictorialData from './components/ShowPictorialData'
import SelectImgFromTag from './components/SelectImgFromTag'
import Login from './Login'

import './components/SelectImgFromTag.scss'

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

function Display() {
  const [images, setImages] = useState([])
  const [tagNames, setTagNames] = useState([])
  const [checker, setChecker] = useState(false)
  const [storePaths, setStorePaths] = useState([])
  const [timeStamps, setTimeStamps] = useState([])
  const [userImages, setUserImages] = useState([])
  const [uuserImages, usetUserImages] = useState([])
  const [userAns, setUserAns] = useState([])
  var [noOfImagess,setNoOfImagess]=useState(0);
  var [userImageUrls,setUserImageUrls]=useState([]);

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

  async function getImages() {
    // get doc
    let tempTag = [],
      tempImg = [],
      tempStorePaths = [],
      tempTimeStamps = []
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

    console.log(tempImg)
    console.log(tempTag)
    console.log(tempStorePaths)

    //rand images
    var randomImages = []
    for (let i = 0; i < tempImg.length; i++) {
      for (let j = 0; j < tempImg[i].length; j++) {
        randomImages.push(tempImg[i][j])
      }
    }
    console.log(randomImages)
    //shuffle
    randomImages = shuffle(randomImages)
    console.log(randomImages)
    //get user images
    const userInfo = collection(db, 'Users')
    const queryForUsername = query(
      userInfo,
      where('userName', '==', 'UserName')
    )
    const userDoc = await getDocs(queryForUsername)
    var userImageUrl_multi = userDoc.docs.map((doc) => doc.data().imagesUrl)

   let userImageUrl = userImageUrl_multi[0].slice()
    console.log(userImageUrl[0])

    userImageUrl = shuffle(userImageUrl)

    setUserImageUrls(userImageUrl.slice())

    console.log(userImageUrl)

    // usetUserImages(userImageUrl)

    var minImages = parseInt(userDoc.docs.map((doc) => doc.data().minImages))
    var maxImages = parseInt(userDoc.docs.map((doc) => doc.data().maxImages))

    console.log(minImages + maxImages)
    let noOfImages=minImages + getRandomInt(maxImages - minImages);
    setNoOfImagess(noOfImages)
    console.log('no of images' + noOfImages)
    const finalImages = new Set()
    //set for images

    for (let i = 0; i < noOfImages; i++) {
      finalImages.add(userImageUrl[i])
      console.log('hi')
    }

    let i = 0
    while (1) {
      if (finalImages.size === 9) {
        break
      }
      // console.log('hi')
      finalImages.add(randomImages[i])
      i++
    }
    
    console.log(finalImages)
    console.log(i)

    setUserImages(shuffle([...finalImages]))
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  useLayoutEffect(() => {
    getImages()
  }, [checker])



  console.log(tagNames)
  const verifyPassword=()=>{

    console.log(noOfImagess)
    console.log(userImageUrls)
    if (userAns.length !== noOfImagess) {
      alert('Wrong passi')
      return
    }
    for (let i = 0; i < userAns.length; i++) {
      let j=0;
      for (; j < userImageUrls.length; j++) {
        if (userImageUrls[j] === userAns[i]) {
          break
        }
      }
      if (j === userImageUrls.length) {
        alert('Wrong Password')
        return
      }
    }
    alert('Login Complete');
  }
  return (
    <>
      {/* <Nav navOption={navOption} setNavOption={setNavOption} />
      <div className='ml-64 m-4 '>
        <div className='ml-4'>
          <SetPictorialData poop={obj}></SetPictorialData>
          <ShowPictorialData poop={obj}></ShowPictorialData> 
         
        </div>
      </div> */}
      {/* <SelectImgFromTag poop={obj} /> */}

      {
        <div className='sliderHere'>
          <div className='w-full  flex justify-center items-center flex-col item'>
            <div className='w-10/12  flex flex-col  items-center imageBox'>
              <div className='w-full text-4xl font-bold tagName text-center flex justify-center'>
                Select Images
              </div>
              <div className='images'>
                {userImages.map((imageUrl, index) => {
                  return (
                    <div>
                      <img
                        src={imageUrl}
                        alt='SOS'
                        key={index}
                        className='selected'
                        onClick={(e) => {
                          if (e.target.style.border === '2px solid black') {
                            e.target.style.border = '0'
                            setUserAns((Arr) => {
                              let selectedForPass = Arr.slice()
                              for (let i = 0; i < selectedForPass.length; i++) {
                                if (selectedForPass[i] === e.target.src) {
                                  selectedForPass.splice(i, 1)
                                  break
                                }
                              }
                              return selectedForPass
                            })
                            return
                          }
                          setUserAns((val) => {
                            val.push(e.target.src)
                            return [...val]
                          })

                          e.target.style.border = '2px solid black'
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className=' flex justify-between items-center text-4xl font-bold m-8'>
            <div>Selections made : {userAns.length}</div>
            <div>
             
              <button onClick={verifyPassword}>Sign-in</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Display
