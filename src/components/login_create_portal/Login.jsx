import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import './Login.scss'
import InstructionPopUp from '../Instruction_pop_up/InstructionPopUp'
import db from '../../FireBase'
import { collection, getDocs } from 'firebase/firestore'

function Login(prop) {
  const type = prop.type
  const Loader = prop.LOADER;

  const [userNameData, setUserNameData] = useState([])

  function validateUsername(name) {
    let findIdx = -1
    userNameData.forEach((val, idx) => {
      if (val === name) {
        findIdx = idx
      }
    })
    if (findIdx === -1) {
      alert('No user found')
      return
    }

    window.location.href = '/display?userName=' + btoa(name)+'&type='+btoa('login')
  }

  function createAccount(name) {
    let check=false;
    userNameData.forEach((val, idx) => {
      if (val === name) {
        alert('Username already taken')
        check=true;
      }
    })
    if(check===true)
     return
     else
    window.location.href = '/createUserPassword?userName=' + btoa(name)+'&type='+btoa('create')
    //  console.log('Created')
  }



  useLayoutEffect(() => {
    Loader(true);
      async function getUserNames() {
        let userInfo = collection(db, 'Users')
        let userInfo_doc = await getDocs(userInfo)
        let userData = userInfo_doc.docs.map((doc) => doc.data().userName)
        setUserNameData(userData)
        Loader(false)
        //  console.log(userData)
      }
    getUserNames()
  }, [])



  const token = localStorage.getItem('signInToken')

  let loggedinsecond=true;
  if(token==null)
  {
    loggedinsecond=false;
  }

  if(loggedinsecond===true)
  {
    window.location.href = '/userPanel'
  }
  else{
  return (
    <div className='login-wrapper'>
      <div className='contact-wrapper'>
        <header className='login-cta'>
          <h2>{type === 'login' ? <>Account Login</> : <>Create account</>}</h2>
        </header>
        <form>
          <div className='form-row'>
            <input type='text' className='inputName' required />
            <span>Username or Email</span>
          </div>
          <div className='form-row'></div>
          <div className='form-row'>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault()

                console.log(
                  document.getElementsByClassName('inputName')[0].value.length
                )
                if (
                  document.getElementsByClassName('inputName')[0].value
                    .length === 0
                ) {
                  alert('Input feild empty')
                  return
                }

                type === 'login'
                  ? validateUsername(
                      document.getElementsByClassName('inputName')[0].value
                    )
                  : createAccount(
                      document.getElementsByClassName('inputName')[0].value
                    )
              }}
            >
              {type === 'login' ? <>Login to your Account!</> : <>Next!</>}
            </button>
          </div>
          <div className='flex justify-evenly'>
            {type === 'login' ? (
              <>Need an account</>
            ) : (
              <>Already have an account</>
            )}
            <button
              type='button'
              onClick={() => {
                type === 'login'
                  ? (window.location.href = '/create')
                  : (window.location.href = '/login')
              }}
              style={{ fontWeight: 'bolder' }}
            >
              {type === 'login' ? <>Create new account</> : <>Sign in</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
            }
            
}

export default Login
