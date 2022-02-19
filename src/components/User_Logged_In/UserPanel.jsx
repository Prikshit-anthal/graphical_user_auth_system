import React from "react";
import { useState } from "react";
import Nav from "../NavBar/Nav";
import UserPanelSettings from "./UserPanelSettings";
import { Nav_content } from '../../constants'
import { Tag, Button, Select, Switch, Input } from 'antd'

function UserPanel(poops)
{
  
  const Loader = poops.LOADER;
  // console.log(Loader)

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
          buttonNoClicked={{
            buttonNoClicked: buttonNoClicked,
            setButtonNoClicked: setButtonNoClicked,
          }}
        />
        <div className='ml-48 contentArea'>
          {buttonNoClicked === 1 ? (
            <div>
              <UserPanelSettings LOADER={Loader} />
            </div>
          ) : (
            <div>
              <div>Hi {atob(localStorage.getItem('signInToken'))}!!</div>
              User Working space.
              <div>
               User account Setting functionality works even css is not much good there :(
              </div>

            </div>
          )}
        </div>
      </div>
    )
  }
}

export default UserPanel