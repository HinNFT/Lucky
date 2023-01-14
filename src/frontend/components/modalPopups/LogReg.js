import { useState } from 'react';

import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import "./Modal.css";



const LogReg = ({openModal, closeLogReg, settingLoginData }) => {
   
  const [form, setForm] = useState('Login')
  const setLogin = () => {
    setForm('Login')
  }

  const setRegister = () => {
    setForm('Register')
  }

  const setForgetPassword = () => {
    setForm('Forgot Password')
  }

    let content
    if(form === 'Login') {
      content = <Login closeLogReg = {closeLogReg} settingLoginData = {settingLoginData}  setRegister = {setRegister} setForgetPassword = {setForgetPassword}/>
    } else if (form === 'Register') {
      content = <Register setLogin ={setLogin} closeLogReg = {closeLogReg} settingLoginData = {settingLoginData}/>
    } else {
      content = <ForgotPassword setLogin ={setLogin} />
    }

  

if (!openModal) return null;
  return (

    <div className="modalBackground">
      <div className="modalContainer">
      <div className="titleCloseBtn">
          <button
            onClick={closeLogReg}
          >
            X
          </button>
        </div>

           <div className="card-body">

          {content}
          

          </div>

        </div>
        </div>   
)
        
  }
  



export default LogReg
