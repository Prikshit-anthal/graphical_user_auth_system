import React from "react";
import './Login.scss'

function CreateAccount()
{
    return (
      <div className='login-wrapper'>
        <div class='contact-wrapper'>
          <header class='login-cta'>
            <h2>Create account</h2>
          </header>
          <form>
            <div class='form-row'>
              <input type='text' required />
              <span>Username or Email</span>
            </div>
            <div class='form-row'></div>
            <div class='form-row'>
              <button type='submit'>Next!</button>
            </div>
            <div className='flex justify-evenly'>
              Already have an account{' '}
              <button style={{ fontWeight: 'bolder' }}>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default CreateAccount