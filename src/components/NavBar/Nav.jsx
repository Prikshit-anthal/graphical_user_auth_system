import React, { useLayoutEffect } from 'react'
import '../../style_static/Nav.scss'

function Nav(props) {
  const Nav_content = props.Nav_content
  const { buttonNoClicked, setButtonNoClicked } = props.buttonNoClicked

  // console.log(Nav_content)

  useLayoutEffect(() => {
    let refs = document.querySelectorAll('[data-no]')
    for (let i = 0; i < refs.length; i++) {
      if (parseInt(refs[i].getAttribute('data-no')) === buttonNoClicked) {
        refs[i].style.fontSize = '130%'
      } else {
        refs[i].style.fontSize = '100%'
      }
    }
  }, [buttonNoClicked])

  return (
    <>
      <div className='left-nav-bar w-48'>
        <div className='left-nav-title text-center w-44 text-4xl mt-4'>
          {Nav_content.title}
        </div>
        <div className='left-nav-body ml-4 w-40  text-xl mt-8'>
          {Nav_content.body.map((item, index) => {
            return (
              <button
                key={index}
                data-no={index}
                className='mb-4 flex items-center'
                onClick={(e) => {
                  setButtonNoClicked(parseInt(e.target.getAttribute('data-no')))
                }}
              >
                {item.icon}
                {item.title}
              </button>
            )
          })}
        </div>
        <button
          className='left-nav-foot ml-4 w-40 bottom-4 text-xl flex items-center'
          onClick={(e) => {
            localStorage.removeItem('signInToken')
            window.location.href = '/login'
          }}
        >
          {Nav_content.foot.icon}
          {Nav_content.foot.title}
        </button>
      </div>
    </>
  )
}

export default Nav
