import React, { useEffect, useState } from 'react'
import './SelectImgFromTag.scss'

function SelectImgFromTag() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [nextDisable, setNextDisable] = useState(false)
  const [prevDisable, setPrevDisable] = useState(true)

  useEffect(() => {
    if (activeIndex >= 1) setNextDisable(true)
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
        <div className='w-full  flex justify-center items-center flex-col item'>
          <div className='w-10/12 flex flex-col justify-center items-center '>
            <div className='w-full text-4xl font-bold tagName text-center'>
              TagName
            </div>
            <div>
              Content Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perferendis autem suscipit quaerat excepturi officiis mollitia
              omnis atque recusandae odio rem. Molestias voluptate consectetur
              minima voluptas perspiciatis amet voluptatibus, deleniti
              voluptatum quibusdam totam quas similique. Nesciunt ipsa placeat
              soluta nam ipsum excepturi officia odit fugit assumenda explicabo
              in consequuntur, ullam, optio, voluptates cumque a consectetur
              obcaecati doloribus facilis hic suscipit! Reprehenderit fugit
              vitae ipsa optio eos ex repellendus aperiam voluptatem error eius
              beatae dignissimos dolorem at nulla quas minus repellat quos vero,
              eligendi totam enim facere animi. Hic delectus exercitationem
              dolore!
            </div>
          </div>
        </div>
        <div className='w-full  flex justify-center items-center flex-col item'>
          <div className='w-10/12 flex justify-center items-center flex-col item'>
            <div className='w-full text-4xl font-bold tagName text-center'>
              TagName
            </div>
            <div>
              Content Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perferendis autem suscipit quaerat excepturi officiis mollitia
              omnis atque recusandae odio rem. Molestias voluptate consectetur
              minima voluptas perspiciatis amet voluptatibus, deleniti
              voluptatum quibusdam totam quas similique. Nesciunt ipsa placeat
              soluta nam ipsum excepturi officia odit fugit assumenda explicabo
              in consequuntur, ullam, optio, voluptates cumque a consectetur
              obcaecati doloribus facilis hic suscipit! Reprehenderit fugit
              vitae ipsa optio eos ex repellendus aperiam voluptatem error eius
              beatae dignissimos dolorem at nulla quas minus repellat quos vero,
              eligendi totam enim facere animi. Hic delectus exercitationem
              dolore!
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setActiveIndex(activeIndex + 1)
        }}
        disabled={nextDisable}
      >
        next
      </button>
      <button
        onClick={() => {
          setActiveIndex(activeIndex - 1)
        }}
        disabled={prevDisable}
      >
        prev
      </button>
    </div>
  )
}

export default SelectImgFromTag
