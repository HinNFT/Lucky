import { useState } from 'react';

import Login from './Login'
import Register from './Register'
import "./Modal.css";


const LogReg = ({openModal, closeLogReg, settingLoginData, accountReg, web3Handler }) => {
   
  const [form, setForm] = useState('Register')
  const setLogin = () => {
    setForm('Login')
  }

  const setRegister = () => {
    setForm('Register')
  }

    let content
    if(form === 'Login') {
      content = <Login closeLogReg = {closeLogReg} settingLoginData = {settingLoginData}  setRegister ={setRegister}/>
    } else {
      content = <Register accountReg ={accountReg} setLogin ={setLogin} web3Handler = {web3Handler} closeLogReg = {closeLogReg} settingLoginData = {settingLoginData}/>
    }

  

if (!openModal) return null;
  return (

    <div className="modalBackground">
      <div className="modalContainer">

           <div className="card-body">

          {content}
          

          </div>

        </div>
        </div>   
)
        
  }
  



export default LogReg
