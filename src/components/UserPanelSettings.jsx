import React, { useState, useLayoutEffect } from 'react'
import './UserPanelSettings.scss'
import db from '../FireBase'
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
      e.target.parentNode.getElementsByClassName('validMark')[0].innerHTML =
        'Enter'
      return
    }
    for (let i = 0; i < userNamesTaken.length; i++) {
      if (e.target.value === userNamesTaken[i]) {
        boolCheck = true
        e.target.parentNode.getElementsByClassName('validMark')[0].innerHTML =
          'Invalid'
        setCanSet(false)
        break
      }
    }
    if (boolCheck === false) {
      e.target.parentNode.getElementsByClassName('validMark')[0].innerHTML =
        'Valid'
      setCanSet(true)
    }
  }

  const setOnDB = async () => {

    //Loader on
    Loader(true);

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

    Loader(false);
    
    localStorage.removeItem('signInToken')
    window.location.href = '/login'

  }

  const passChange = () => {
    window.location.href =
      '/display?userName=' + btoa(userName) + '&type=' + btoa('passChange')
  }

  return (
    <div className='user-setting-container'>
      <div className='text-3xl ml-4 my-4'>Settings</div>
      <div>
        <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
          User Account Settings
          <button className=''>Arrow</button>
        </div>
        <div className='px-4 my-4 flex justify-between'>
          <div>UserName</div>
          <button>Edit</button>
        </div>
        <div className='px-4 flex justify-between'>
          <div className='flex'>
            <input
              type='text'
              id='newUserName'
              onChange={(e) => {
                validateNewUsername(e)
              }}
            />
            <div className='validMark'>Enter</div>
          </div>
          <button disabled={!canSet} onClick={setOnDB}>
            Set
          </button>
        </div>
        <div className='px-4 my-4 flex  justify-between'>
          <div> Password</div>

          <button onClick={passChange}>Edit</button>
        </div>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake<button className=''>Arrow</button>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake<button className=''>Arrow</button>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake<button className=''>Arrow</button>
      </div>
      <div className='w-full text-2xl px-4 my-4 dropDownSettings flex justify-between'>
        Fake<button className=''>Arrow</button>
      </div>
    </div>
  )
}

export default UserPanelSettings
