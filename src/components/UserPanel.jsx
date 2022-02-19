import React from "react";
import { useState } from "react";
import Nav from "./Nav";
import { Nav_content } from '../constants'

function UserPanel()
{
    const [buttonNoClicked,setButtonNoClicked]=useState(0);

  const token = localStorage.getItem('signInToken')
  
     let loggedin = true;
  if (token == null) {
    loggedin = false;
  }

  if (loggedin === false) {
    window.location.href='/login';
  } else {
    return (
      <div>
        <Nav
          Nav_content={Nav_content}
          buttonNoClicked={{buttonNoClicked:buttonNoClicked, setButtonNoClicked:setButtonNoClicked}}
        />
        <div className='ml-64 m-4 '>
          <div className='ml-4'>Done</div>
        </div>
      </div>
    )
  }
}

export default UserPanel