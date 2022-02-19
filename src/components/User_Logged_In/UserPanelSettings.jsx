import React, { useState, useRef, useLayoutEffect } from 'react'
import '../../style_static/UserPanelSettings.scss'

import {
  CaretDownOutlined,
  CloseSquareOutlined,
  CheckOutlined,
  EditOutlined,
} from '@ant-design/icons'

import { Tag, Button, Input, Select, Switch } from 'antd'
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

function UserPanelSettings(poops) {
  const Loader = poops.LOADER

  const [userNamesTaken, setUserNamesTaken] = useState([])
  const [canSet, setCanSet] = useState(false)
  const [userName, setUserName] = useState(
    atob(localStorage.getItem('signInToken'))
  )
  const [inputState, setInputState] = useState('enter')
  const ref=useRef(null);
  const ref2=useRef(null)

  async function getUserNames() {
    let userInfo = collection(db, 'Users')
    let userInfo_doc = await getDocs(userInfo)
    let userData = userInfo_doc.docs.map((doc) => doc.data().userName)
    setUserNamesTaken(userData)
    //  console.log(userData)
  }

  useLayoutEffect(() => {
    getUserNames()
  }, [userName])

  const validateNewUsername = (e) => {
    let boolCheck = false
    //    console.log(e.target.parentNode.getElementsByClassName('validMark')[0])
    // console.log('u' + e.target.value)
    console.log('hi')
    console.log(e.target.value.length)
    if (e.target.value.length === 0) {
      console.log('in')
      setCanSet(false)
      setInputState('enter')
      return
    }
    for (let i = 0; i < userNamesTaken.length; i++) {
      if (e.target.value === userNamesTaken[i]) {
        boolCheck = true
        setInputState('invalid')
        setCanSet(false)
        break
      }
    }
    if (boolCheck === false) {
      setInputState('valid')
      setCanSet(true)
    }
  }

  const setOnDB = async () => {
    //Loader on
    Loader(true)

    //get timestamp
    const userInfo = collection(db, 'Users')
    const queryForUsername = query(userInfo, where('userName', '==', userName))
    const userDoc = await getDocs(queryForUsername)
    var userImageUrl_multi = userDoc.docs.map((doc) => doc.data().timeStamp)
    console.log(userImageUrl_multi)

    var newName = document.getElementById('newUserName').value

    //  update docs
    await updateDoc(doc(db, 'Users', userImageUrl_multi[0]), {
      userName: newName,
    })

    alert('update done New userName : ' + newName)

    Loader(false)

    localStorage.removeItem('signInToken')
    window.location.href = '/login'
  }

  const passChange = () => {
    window.location.href =
      '/display?userName=' + btoa(userName) + '&type=' + btoa('passChange')
  }

  return (
    <div className='user-setting-container'>
      <div className='text-3xl ml-4 my-4 user-setting-content'>Settings</div>
      <div>
        <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
          User Account Settings
          <div
            onClick={() => {
              console.log(ref.current)
              ref.current.className === 'visibleToSlide'
                ? (ref.current.className = 'hiddenToSlide')
                : (ref.current.className = 'visibleToSlide')
            }}
          >
            <CaretDownOutlined />
          </div>
        </div>
        <div
          className='hiddenToSlide'
          style={{
            overflow: 'hidden',
          }}
          ref={ref}
        >
          <div className='px-4 my-4 flex justify-between'>
            <div>UserName</div>
            <div
              className='pointerMe'
              onClick={() => {
                ref2.current.className === 'visibleToSlide'
                  ? (ref2.current.className = 'hiddenToSlide')
                  : (ref2.current.className = 'visibleToSlide')
              }}
            >
              <EditOutlined />
            </div>
          </div>
          <div
            ref={ref2}
            style={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
            className='hiddenToSlide'
          >
            <div className=' flex items-center'>
              <Input
                type='text'
                id='newUserName'
                onChange={(e) => {
                  validateNewUsername(e)
                }}
              />
              <div className='validMark'>
                {inputState === 'enter' ? (
                  <EditOutlined />
                ) : inputState === 'valid' ? (
                  <CheckOutlined />
                ) : (
                  <CloseSquareOutlined />
                )}
              </div>
            </div>
            <Button type='primary' className='fontSizeMatters' disabled={!canSet} onClick={setOnDB}>
              Set
            </Button>
          </div>
          <div className='px-4 my-4 flex  justify-between'>
            <div> Password</div>

            <div onClick={passChange} className='pointerMe'>
              <EditOutlined />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake
        <div className=''>
          <CaretDownOutlined />
        </div>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake
        <div className=''>
          <CaretDownOutlined />
        </div>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake
        <div className=''>
          <CaretDownOutlined />
        </div>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake
        <div className=''>
          <CaretDownOutlined />
        </div>
      </div>
    </div>
  )
}

export default UserPanelSettings
