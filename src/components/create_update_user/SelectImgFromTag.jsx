import React, { useEffect, useLayoutEffect, useState } from 'react'
import './SelectImgFromTag.scss'
import { Tag, Button , Select, Switch, Input } from 'antd'
import db from '../../FireBase'
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

function SelectImgFromTag(poops) {
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

  const Loader = poops.LOADER

  const [activeIndex, setActiveIndex] = useState(0)
  const [nextDisable, setNextDisable] = useState(false)
  const [prevDisable, setPrevDisable] = useState(true)
  const [selectedForPass, setSelectionForPass] = useState([])
  const [userName, setUserName] = useState('')
  const [type, setType] = useState('')
  // const [selectedForPass, setSelectionForPass] = useState([])

  console.log(selectedForPass)

  useLayoutEffect(() => {
   Loader(true)

    let timer1 = setTimeout(() => {
      //loader off
      //loading img time
      Loader(false)
    }, 3000)
   
    const params = new URL(document.location).searchParams
    var decrypted = atob(params.get('userName'))
    setType(atob(params.get('type')))
    setUserName(decrypted)
    console.log(userName)

     return () => {
       clearTimeout(timer1)
     }
    
  }, [userName])

  useEffect(() => {
    if (activeIndex >= 5) setNextDisable(true)
    else setNextDisable(false)

    if (activeIndex <= 0) setPrevDisable(true)
    else {
      setPrevDisable(false)
    }

    
    //    console.log('hi'+activeIndex)
  }, [activeIndex])

  const createNewUser = async () => {

console.log(selectedForPass.length)
console.log(selectedForPass)
    if (selectedForPass.length < 5) {
      alert('Min 5 imgs to be selected for password')
      return
    }

    let tagArr = [],
      imgArr = []
    for (let i = 0; i < selectedForPass.length; i++) {
      tagArr.push(tagNames[selectedForPass[i][0]])
      imgArr.push(images[selectedForPass[i][0]][selectedForPass[i][1]])
    }

    console.log(userName)

    //if new account
    if (type === 'create') {
      //loader on
      Loader(true)

      const timeStamp = String(new Date().getTime())
      //username check left still
      await setDoc(doc(db, 'Users', timeStamp), {
        userName: userName,
        tags: tagArr,
        imagesUrl: imgArr,
        minImages: 2,
        maxImages: 5,
        timeStamp: timeStamp,
      })
      console.log('done')
      alert('Account made')
      //loader off
      Loader(false)
      window.location.href = '/login'
    }

    ///if updating passs
    else if (type === 'update') {

      //Loader on
      Loader(true);

      //get timestamp of user files
      const userInfo = collection(db, 'Users')
      const queryForUsername = query(
        userInfo,
        where('userName', '==', userName)
      )
      const userDoc = await getDocs(queryForUsername)
      var userImageUrl_multi = userDoc.docs.map((doc) => doc.data().timeStamp)

      console.log(userImageUrl_multi)

      //  update docs
      await updateDoc(doc(db, 'Users', userImageUrl_multi[0]), {
        userName: userName,
        tags: tagArr,
        imagesUrl: imgArr,
        minImages: 2,
        maxImages: 5,
        timeStamp: userImageUrl_multi[0],
      })
      alert('update done')
      //loader off
      Loader(false);
      localStorage.removeItem('signInToken');
      window.location.href = '/login';
    }
  }

  return (
    <div className='sliderHere'>
      <div className='popUpHere'>
        <div className='w-full mt-12  flex justify-center items-center flex-col item'>
          <div className='text-2xl my-4 head'>Images chosen yet</div>
          <div className='w-10/12  flex flex-col  items-center imageBox'>
            <div className='w-full subHead text-4xl font-bold tagName text-center flex items-center justify-between'>
              <Button
                type='primary'
                className='ml-2 buttons'
                onClick={() => {
                  document.getElementsByClassName(
                    'popUpHere'
                  )[0].style.display = 'none'
                }}
              >
                back
              </Button>
              Selected
              <Button
                type='primary'
                className='mr-2 buttons'
                onClick={() => {
                  setSelectionForPass((val) => {
                    for (let i = 0; i < val.length; i++) {
                      //making border again normal on de select all
                      var ref = document.querySelector(
                        `[data-tag-idx="${val[i][0]}"][data-url-idx="${val[i][1]}"]`
                      )

                      //  console.log(ref)
                      ref.style.border = '0'
                    }
                    return []
                  })
                }}
              >
                Uncheck-All
              </Button>
            </div>
            <div className='images'>
              {selectedForPass.map((val, idx) => {
                return (
                  <div key={idx}>
                    <img
                      src={images[val[0]][val[1]]}
                      className='selected'
                      alt='SOS'
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='text-center head my-4 text-3xl'>Choose images</div>
      <div
        className=' sliderContainer'
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {tagNames.map((tag, idx) => {
          return (
            <div
              key={idx}
              className='w-full  flex justify-center items-center flex-col item'
            >
              <div className='w-10/12  flex flex-col  items-center imageBox'>
                <div className='w-full text-3xl font-bold tagName subHead items-center  text-center flex justify-between'>
                  <Button
                    type='primary'
                    className='ml-2 buttons'
                    onClick={() => {
                      setActiveIndex(activeIndex - 1)
                    }}
                    disabled={prevDisable}
                  >
                    prev
                  </Button>
                  {tag}
                  <Button
                    type='primary'
                    className='mr-2 buttons'
                    onClick={() => {
                      setActiveIndex(activeIndex + 1)
                    }}
                    disabled={nextDisable}
                  >
                    next
                  </Button>
                </div>
                <div className='images'>
                  {images[idx].map((imageUrl, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt='SOS'
                          data-tag-idx={idx}
                          data-url-idx={index}
                          key={index}
                          className='selected'
                          onClick={(e) => {
                            if (e.target.style.border === '2px solid black') {
                              e.target.style.border = '0'
                              setSelectionForPass((Arr) => {
                                let selectedForPass = Arr.slice()
                                for (
                                  let i = 0;
                                  i < selectedForPass.length;
                                  i++
                                ) {
                                  if (
                                    selectedForPass[i][0] ===
                                      e.target.getAttribute('data-tag-idx') &&
                                    selectedForPass[i][1] ===
                                      e.target.getAttribute('data-url-idx')
                                  ) {
                                    selectedForPass.splice(i, 1)
                                    break
                                  }
                                }
                                return selectedForPass
                              })

                              console.log(selectedForPass)
                              return
                            }

                            if (selectedForPass.length === 10) {
                              alert('Max selections for password is 10 images')
                              return
                            }
                            e.target.style.border = '2px solid black'

                            setSelectionForPass((Arr) => {
                              let val = Arr.slice()
                              val.push([
                                e.target.getAttribute('data-tag-idx'),
                                e.target.getAttribute('data-url-idx'),
                              ])

                              return val
                            })
                            console.log(selectedForPass)
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex justify-center'>
        <div
          className='flex w-full justify-between items-center text-2xl font-bold mt-8 bottom'
          style={{ maxWidth: '70vw' }}
        >
          <div>Selections:{selectedForPass.length}</div>
          <div>
            <Button
              type='primary'
              className='mx-4 buttons'
              onClick={() => {
                let ref = document.getElementsByClassName('popUpHere')[0]
                if (ref.style.display === 'block') ref.style.display = 'none'
                else ref.style.display = 'block'
              }}
            >
              View
            </Button>
            <Button type='primary' className='buttons' onClick={createNewUser}>
              Set
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectImgFromTag
