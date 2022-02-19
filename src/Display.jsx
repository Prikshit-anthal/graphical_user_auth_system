import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import { useLayoutEffect } from 'react'
import SetPictorialData from './components/SetPictorialData'
import ShowPictorialData from './components/ShowPictorialData'
import SelectImgFromTag from './components/SelectImgFromTag'
import Login from './Login'
import { SHUFFLE_ARRAY, GET_RANDOM_INT } from './constants'
import { DATA_FROM_DB } from './constants'

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

function Display(poops) {

  const {
    images,
    setImages,
    tagNames,
    setTagNames,
    checker,
    setChecker,
    storePaths,
    setStorePaths,
    timeStamps,
    setTimeStamps,
  } = poops.DB_DATA


console.log(images);
console.log(tagNames);

  const [userImages, setUserImages] = useState([])
  const [uuserImages, usetUserImages] = useState([])
  const [userAns, setUserAns] = useState([])
  const [noOfImagess, setNoOfImagess] = useState(0)
  const [userImageUrls, setUserImageUrls] = useState([])
  const [loggedIn,setLoggedIn]=useState(false);
  const [encryptUserName, setEncryptUserName] = useState()

  //db data from prop
  useLayoutEffect(() => {
      const params = new URL(document.location).searchParams
      setEncryptUserName(params.get('userName'));
      var decrypted =atob( params.get('userName'))
      var userName=decrypted;
      console.log(userName)


   

      async function  getUserImages(){
      //rand images
      var randomImages = []
      for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < images[i].length; j++) {
          randomImages.push(images[i][j])
        }
      }
      console.log(randomImages)
      //shuffle
      randomImages = SHUFFLE_ARRAY(randomImages)
      console.log(randomImages)
      //get user images

      const userInfo = collection(db, 'Users')
      const queryForUsername = query(
        userInfo,
        where('userName', '==',  userName )
      )
      const userDoc = await getDocs(queryForUsername)
      var userImageUrl_multi = userDoc.docs.map((doc) => doc.data().imagesUrl)
      console.log(userImageUrl_multi)
      let userImageUrl = userImageUrl_multi[0].slice()
      console.log(userImageUrl[0])

      userImageUrl = SHUFFLE_ARRAY(userImageUrl)
      setUserImageUrls(userImageUrl.slice())

      console.log(userImageUrl)

      // usetUserImages(userImageUrl)

      var minImages = parseInt(userDoc.docs.map((doc) => doc.data().minImages))
      var maxImages = parseInt(userDoc.docs.map((doc) => doc.data().maxImages))

      console.log(minImages + maxImages)
      let noOfImages = minImages + GET_RANDOM_INT(maxImages - minImages)
      setNoOfImagess(noOfImages)
      console.log('no of images' + noOfImages)
      //hhhhh
      const finalImages = new Set()
      //set for images

      for (let i = 0; i < noOfImages; i++) {
        finalImages.add(userImageUrl[i])
        console.log('hi')
      }
      let i = 0
      console.log(randomImages)
      while (true) {
        if (finalImages.size === 9) {
          break
        }
        // console.log('hi')
        let boolCheck=true;

        //checking if random images match selected images
        //dont take images selected by user as pass here as they are already taken
        for(let j=0;j<userImageUrl.length;j++)
        {
             if(userImageUrl[j]===randomImages[i])
             boolCheck=false;
        }

        if(boolCheck===true)
        finalImages.add(randomImages[i])
        i++
      }

      console.log(finalImages)
      console.log(i)

      setUserImages(SHUFFLE_ARRAY([...finalImages]))
    }

    // DATA_FROM_DB()
    //it is imp as on first render images is empty not come yet
    //if it goes inside it encounters errors due to being empty
    if(images.length!==0)
    getUserImages();
  }, [images])


  console.log(tagNames)

  const verifyPassword = () => {
    console.log(noOfImagess)
    console.log(userImageUrls)
    if (userAns.length !== noOfImagess) {
      alert('Wrong passi')
      return
    }
    for (let i = 0; i < userAns.length; i++) {
      let j = 0
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
    //token in browser memory
    localStorage.setItem('signInToken', encryptUserName)
    setLoggedIn(true);
    alert('Login Complete')
  }

  const token = localStorage.getItem('signInToken')

  let loggedinsecond=true;
  if(token==null)
  {
    loggedinsecond=false;
  }

  if(loggedinsecond===true)
  {
    window.location.href = '/userPanel?userName=' + token
  }
  else if(loggedIn===true)
  {
    window.location.href = '/userPanel?userName=' + token

  }
  else{



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
                                  //splice to remove array item from begin i.e selected images un selected
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
}

export default Display
