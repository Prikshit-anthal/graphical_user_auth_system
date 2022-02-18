import React, { useLayoutEffect, useState } from 'react'
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

  
  // console.log(COMMON_DB_DATA)



  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Login type={'login'}  />}
        />
        <Route
          path='/create'
          element={<Login type={'create'}  />}
        />
        <Route
          path='/display'
          element={<Display   />}
        />
      </Routes>
    </>
  )
}

export default App
