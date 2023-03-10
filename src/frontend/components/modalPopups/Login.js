import { useState } from 'react';
import "./Modal.css";
import Axios from 'axios'

const Login = ({closeLogReg, settingLoginData, setRegister, setForgetPassword}) => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const login = async () => {
    await Axios.post("https://lucky568booo0998boo.info/login", {
      email: email,
      password: password
    }).then((response) => {
      if(response.data.message){
        window.alert(response.data.message)
      } else {
        settingLoginData(response.data[0])
        closeLogReg()
        window.alert(`Logged in as '${response.data[0].email}'`)  
           }
    })
  }




    return (
      <form>

      <div className="text-center">
          <h3>Login</h3>
        </div>
        
              <div className = "pass-container">
        <div className="mb-3">

          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=> {setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-3">
      
          <input
            type="text"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=> {setPassword(e.target.value)}}
          />
        </div>
        
        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={login}>
            Login
          </button>

          <button type="button"
          className ="btn btn-light"
          onClick ={setRegister}>              
            Register account
          </button>
        </div>
        <br/>
        <a className="forget-pass" onClick ={setForgetPassword}> Forgot password?</a>
         
 
        </div>
      </form>

      
    )
  
}

export default Login

