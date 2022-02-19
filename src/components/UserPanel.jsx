import React from "react";

function UserPanel()
{
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
        Done
        <div
          id='action-signout'
          onClick={(e) => {
            localStorage.removeItem('signInToken')
            window.location.href = '/login'
          }}
        >
          Sign Out
        </div>
      </div>
    )
  }
}

export default UserPanel