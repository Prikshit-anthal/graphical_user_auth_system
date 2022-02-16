import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import './show.scss'

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
} from 'firebase/firestore'



function ShowPictorialData(poops)

{ const {images,setImages,tagNames,setTagNames}=poops.poop;



   const getImages=async()=>{
    // get doc
    let tempTag=[],tempImg=[];
    const imagesInfo = collection(db, 'images')
    const imagesDocs = await getDocs(imagesInfo)
    var check=imagesDocs.docs.map((doc) =>{
    
    // tagNames.push(doc.data().name);
    tempTag.push(doc.data().name);
    if (doc.data().imgUrl!==undefined) 
    tempImg.push(doc.data().imgUrl)
    else
    tempImg.push([])
    
    return(true);
    })
    
    setImages(tempImg)
    setTagNames(tempTag);

    console.log(tempImg)
    console.log(tempTag)
  }
  
  useLayoutEffect(()=>{
  getImages();
  },[])



  return (
    <>
      {
        tagNames.map((tag, idx) => {
          return (
            <div key={idx}>
              <div className='tag'>
                {tag}
                <div className='images'>
                  {images[idx].map((imageUrl, index) => {
                    return <img src={imageUrl} key={index} alt='sos' />
                  })}
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ShowPictorialData