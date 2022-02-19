import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import './show.scss'

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
} from 'firebase/firestore'

function ShowPictorialData(poops)

{ const {
  images,
  setImages,
  tagNames,
  setTagNames,
  checker,
  setChecker,
  storePaths,
  setStorePaths,
  timeStamps,
  setTimeStamps
} = poops.poop
  var selectedForDeletion=[];
  const uniRef=useRef(null);
const storage = getStorage()

  return (
    <>
      {tagNames.length===0?<></>:
        tagNames.map((tag, idx) => {
          return (
            <div key={idx}>
              <div className='tag'>
                <div className='flex justify-between'>
                  <div>{tag}</div>
                  <div className='flex justify-end'>
                    <button
                      onClick={(e) => {
                        // console.log(e.target.parentNode)
                        uniRef.current =
                          e.target.parentNode.getElementsByClassName('hid_see')

                        for (let i = 0; i < uniRef.current.length; i++) {
                          uniRef.current[i].style.display = 'block'
                          // console.log(refs[i])
                        }

                      }}
                    >
                      edit
                    </button>
                    <button className='hid_see' onClick={(e)=>{
                      var x=e.target.parentNode.parentNode.parentNode.getElementsByClassName(
                        'selected'
                      )
                      console.log(x)
                      for(let i=0;i<x.length;i++)
                      x[i].click();
                    }}>select all</button>
                    <button className='hid_see' onClick={async (e)=>{

                      if(selectedForDeletion.length==0)
                      {
                        alert('nthg selected')
                        return
                      }
                      let tempImgUrl = [],
                        tempStoragePath = [],
                        tempTimestamps = []
                      console.log(selectedForDeletion)

                      for (
                        let i = 0;
                        i < images[selectedForDeletion[0][0]].length;
                        i++
                      ) {
                        var boolCheck = false
                        console.log('i ' + i)

                        for (let j = 0; j < selectedForDeletion.length; j++) {
                          console.log('j ' + j)
                          console.log(
                            i + ' ' + parseInt(selectedForDeletion[j][1])
                          )
                          if (parseInt(selectedForDeletion[j][1]) === i) {
                            console.log('inside')
                            boolCheck = true
                          }
                        }
                        if (!boolCheck) {
                          tempImgUrl.push(images[selectedForDeletion[0][0]][i])
                          tempStoragePath.push(
                            storePaths[selectedForDeletion[0][0]][i]
                          )
                          tempTimestamps.push(
                            timeStamps[selectedForDeletion[0][0]][i]
                          )
                        }
                      }
                      console.log(tempImgUrl)
                      console.log(tempStoragePath)
                      console.log(tempTimestamps)

                     //delete all
                      if (
                        selectedForDeletion.length ===
                        images[selectedForDeletion[0][0]].length
                      ) {
                        deleteDoc(
                          doc(db, 'images', tagNames[selectedForDeletion[0][0]])
                        )
                      } else {
                        // update doc
                        await updateDoc(
                          doc(
                            db,
                            'images',
                            tagNames[selectedForDeletion[0][0]]
                          ),
                          {
                            imgUrl: tempImgUrl,
                            storagePath: tempStoragePath,
                            timeStamps: tempTimestamps,
                          }
                        )
                      }

                        for (let i = 0; i < selectedForDeletion.length; i++) {
                          const desertRef = ref(
                            storage,
                            `${
                              storePaths[selectedForDeletion[i][0]][
                                selectedForDeletion[i][1]
                              ]
                            }`
                          )
                          await deleteObject(desertRef)
                        }

                      console.log('done')
                      setChecker(!checker)
                    }}>delete</button>
                    <button
                      className='hid_see'
                      onClick={(e) => {
                        // console.log(e.target.parentNode)
                        uniRef.current=
                          e.target.parentNode.getElementsByClassName('hid_see')

                        for (let i = 0; i < uniRef.current.length; i++) {
                          uniRef.current[i].style.display = 'none'
                          // console.log(refs[i])
                        }
                        var ref =
                          e.target.parentNode.parentNode.parentNode.getElementsByClassName(
                            'selected'
                          )
                          console.log(uniRef.current)
                        for (let i = 0; i < ref.length; i++) {
                          console.log(ref[i])
                          
                          ref[i].style.border='0';

                        }
                       selectedForDeletion=[];
                       
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className='images'>
                  {images[idx].map((imageUrl, index) => {
                    return <img src={imageUrl} data-tag-idx={idx} data-url-idx={index} key={index} className='selected' onClick={(e)=>{
                    let ref =
                      e.target.parentNode.parentNode.getElementsByClassName(
                        'hid_see'
                      )[0]
                    console.log(ref.style.display)
                    if (
                      ref.style.display === 'none' || ref.style.display ===''
                    )
                      return;
                      
                    e.target.style.border='2px solid black';
                     selectedForDeletion.push([
                       e.target.getAttribute('data-tag-idx'),
                       e.target.getAttribute('data-url-idx'),
                     ])
                    }} alt='sos' />
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