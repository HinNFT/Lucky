import { useState } from 'react';

import Login from './Login'
import Register from './Register'
import "./Modal.css";


const LogReg = ({openModal, closeLogReg, settingLoginData}) => {
   
  const [form, setForm] = useState('Login')

    let content
    if(form === 'Login') {
      content = <Login closeLogReg = {closeLogReg} settingLoginData = {settingLoginData}/>
    } else {
      content = <Register />
    }


if (!openModal) return null;
  return (

    <div className="modalBackground">
      <div className="modalContainer">

           <div className="card-body">

          {content}
          

          </div>

              <button type="button"
              className="btn btn-light"
              onClick ={(event) => {
                setForm('Login')
              }}>
            Already registered? Login
          </button>

          <button type="button"
          className ="btn btn-light"
          onClick ={(event) => {
                setForm('Register')
              }}>              
            Register account
          </button>


        </div>
        </div>   
)
        
  }
  



export default LogReg
