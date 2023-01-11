import { useState } from 'react'
import "./Modal.css";
import Axios from 'axios'

const Register = ({accountReg, web3Handler}) => {
  const[emailReg, setEmailReg] = useState('')
  const[passwordReg, setPasswordReg] = useState('')
  const[ConfirmPasswordReg, setConfirmPasswordReg] = useState('')
  const[refCodeReg, setRefCodeReg] = useState('')

  const register = () => {
    if(passwordReg === ConfirmPasswordReg) {
      Axios.post("http://3.113.28.230:3306/register", {
      email: emailReg,
      password: passwordReg,
      referrerCode: refCodeReg,
      account: accountReg
    }).then((response) => {
        window.alert(response.data.message)
      })
    } else {
      window.alert("Passwords don't match!")
    }

    
    }
  
   return (
      <form>
        <div className="text-center">
          <h3>Register</h3>
        </div>
      
        <div className="mb-3">
  
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=> {setEmailReg(e.target.value)}}
          />
        </div>
        <div className="mb-3">
    
          <input
            type="text"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=> {setPasswordReg(e.target.value)}}
            
          />
        </div>

        <div className="mb-3">
    
          <input
            type="text"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e)=> {setConfirmPasswordReg(e.target.value)}}
          />
        </div>
        <div className="mb-3">
    
          <input
            type="text"
            className="form-control"
            placeholder="Referral code"
            onChange={(e)=> {setRefCodeReg(e.target.value)}}
          />
        </div>
        <div className="d-grid">
         <button type="button" className="btn btn-secondary" onClick ={web3Handler}>
            Connect Wallet ()
          </button>
        
          <button type="button" className="btn btn-primary" onClick ={register}>
            Sign Up
          </button>
        </div>

    
      </form>

    )
  
}

export default Register