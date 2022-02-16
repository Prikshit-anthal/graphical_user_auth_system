import React from 'react'
import { Nav_content } from '../constants'
import { PlayCircleOutlined, LoginOutlined } from '@ant-design/icons'
import './Nav.scss'


function Nav({navOption,setNavOption}) {
  
  return (
    <>
      <div className='left-nav-bar w-64'>
        <div className='left-nav-title text-center w-44 text-4xl mt-4'>
          {Nav_content.title}
        </div>
        <div className='left-nav-body ml-4 w-40  text-xl mt-8'>
          {Nav_content.body.map((item, index) => {
            return (
              <button  key={index} className='mb-4 flex items-center'>
                <PlayCircleOutlined className='pr-4' />
                {item.title}
              </button>
            )
          })}
        </div>
        <button className='left-nav-foot ml-4 w-40 bottom-4 text-xl flex items-center'>
          <LoginOutlined className='pr-4' />
          {Nav_content.foot.title}
        </button>
      </div>
    </>
  )
}

export default Nav;