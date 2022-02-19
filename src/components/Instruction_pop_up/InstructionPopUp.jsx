import React, { useEffect } from 'react'
import './InstructionPopUp.scss'
import {

  CloseSquareOutlined,

} from '@ant-design/icons'

function InstructionPopUp() {
  useEffect(() => {
   document.getElementsByClassName('popup-onload')[0].style.display = 'flex'
   document.getElementById('overlay').style.display = 'block'

  }, [])

  return (
    <div className='instruction-popup'>
      <div id='overlay'></div>
      <div className='popup-onload'>
        <div className='cnt223'>
          <div className='text-3xl flex justify-between topic'>
            Instructions to use:
            <a href='/login'
            className='close'
              onClick={() => {
                document.getElementsByClassName(
                  'popup-onload'
                )[0].style.display = 'none'
                document.getElementById('overlay').style.display = 'none'
              }}
              
            >
             <CloseSquareOutlined/>
            </a>
          </div>

          <div>
            <ol style={{ listStyleType: 'upper-roman' }} className='my-4 mx-4 py-2'>
              <li>Give Your Email as username.</li>
              <li>
                Select images from various categories available that u like.
              </li>
              <li>Select Min of 5 images and Max of 10 images.</li>
              <li>
                These selected images will be used to identify you during login.
              </li>
              <li>
                Set ur [min,max] range limit of your password images to view for
                selection during login.
              </li>
              <li>Images will be shuffled everytime during login.</li>
              <li>
                Your all selected password images will never come during login
                to avoid people seeing you selecting your password
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionPopUp
