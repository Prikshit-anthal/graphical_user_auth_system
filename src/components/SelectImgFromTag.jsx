import React, { useEffect, useState } from 'react'
import './SelectImgFromTag.scss'
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
  } = poops.poop

  const [activeIndex, setActiveIndex] = useState(0)
  const [nextDisable, setNextDisable] = useState(false)
  const [prevDisable, setPrevDisable] = useState(true)
   const [selectedForPass, setSelectionForPass] = useState([])

  // const [selectedForPass, setSelectionForPass] = useState([])

  console.log(selectedForPass)

  useEffect(() => {
    if (activeIndex >= 5) setNextDisable(true)
    else setNextDisable(false)

    if (activeIndex <= 0) setPrevDisable(true)
    else {
      setPrevDisable(false)
    }

    //    console.log('hi'+activeIndex)
  }, [activeIndex])

  const createNewUser=async ()=>{
    if (selectedForPass.length <= 5) {
      alert('Min 5 imgs to be selected for password')
      return
    }

    let tagArr=[],imgArr=[];
    for(let i=0;i<selectedForPass.length;i++)
    {
      tagArr.push(tagNames[selectedForPass[i][0]]);
      imgArr.push(images[selectedForPass[i][0]][selectedForPass[i][1]]);
    }
    //username check left still
    await setDoc(doc(db, 'Users', 'UserName'), {
      userName:'UserName',
      tags: tagArr,
      imagesUrl: imgArr,
      minImages:2,
      maxImages:5,
    })
    console.log('done');
  }

  return (
    <div className='sliderHere'>
      <div className='popUpHere' >
        <div className='w-full mt-12  flex justify-center items-center flex-col item'>
          <div className='w-10/12  flex flex-col  items-center imageBox'>
            <div className='w-full text-4xl font-bold tagName text-center flex justify-between'>
              <button
              onClick={()=>{
                document.getElementsByClassName('popUpHere')[0].style.display='none';
              }}
              >back</button>
              Selected
              <button
              onClick={()=>{
                setSelectionForPass((val)=>{
                  return([])
                })
              }}>De-select all</button>
            </div>
            <div className='images'>
              {selectedForPass.map((val, idx) => {
                return (
                  <div>
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
      <div
        className=' sliderContainer'
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {tagNames.map((tag, idx) => {
          return (
            <div className='w-full  flex justify-center items-center flex-col item'>
              <div className='w-10/12  flex flex-col  items-center imageBox'>
                <div className='w-full text-4xl font-bold tagName text-center flex justify-between'>
                  <button
                    onClick={() => {
                      setActiveIndex(activeIndex - 1)
                    }}
                    disabled={prevDisable}
                  >
                    prev
                  </button>
                  {tag}
                  <button
                    onClick={() => {
                      setActiveIndex(activeIndex + 1)
                    }}
                    disabled={nextDisable}
                  >
                    next
                  </button>
                </div>
                <div className='images'>
                  {images[idx].map((imageUrl, index) => {
                    return (
                      <div>
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
      <div className=' flex justify-between items-center text-4xl font-bold m-8'>
        <div>Selections made : {selectedForPass.length}</div>
        <div>
          <button onClick={() => {
           let ref= document.getElementsByClassName('popUpHere')[0];
           if(ref.style.display==='block')
           ref.style.display='none';
           else
           ref.style.display = 'block';
          }}>View</button>
          <button
          onClick={createNewUser}
          >Set</button>
        </div>
      </div>
    </div>
  )
}

export default SelectImgFromTag