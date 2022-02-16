import React, { useEffect, useLayoutEffect, useRef } from "react";
import './Login.scss'

function Login()
{
    return (
      <div className='login-wrapper'>
        <div class='contact-wrapper'>
          <header class='login-cta'>
            <h2>Account Login</h2>
          </header>
          <form>
            <div class='form-row'>
              <input type='text' required />
              <span>Username or Email</span>
            </div>
            <div class='form-row'></div>
            <div class='form-row'>
              <button type='submit'>Login to your Account!</button>
            </div>
            <div className='flex justify-evenly'>
              Need an account?{' '}
              <button style={{ fontWeight: 'bolder' }}>
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login;