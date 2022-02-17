import React, { useEffect, useState } from 'react'
import './SelectImgFromTag.scss'

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

  return (
    <div className='sliderHere'>
      <div
        className=' sliderContainer'
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {tagNames.map((tag, idx) => {
          return (
            <div className='w-full  flex justify-center items-center flex-col item'>
              <div className='w-10/12  flex flex-col justify-center items-center imageBox'>
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
      <div>
        No of selections:
        {selectedForPass.length}
      </div>
    </div>
  )
}

export default SelectImgFromTag
