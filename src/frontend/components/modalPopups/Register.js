import { useState } from 'react'
import "./Modal.css";
import Axios from 'axios'

const Register = ({ web3Handler, addressReg}) => {
  const[emailReg, setEmailReg] = useState('')
  const[passwordReg, setPasswordReg] = useState('')
  const[refCodeReg, setRefCodeReg] = useState('')

  const register = async () => {
    await Axios.post("http://localhost:3001/register", {
      email: emailReg,
      password: passwordReg,
      address: addressReg,
      referrerCode: refCodeReg
    }).then((response) => {
        window.alert(response.data.message)
      })
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
            type="password"
            className="form-control"
            placeholder="Enter password"
            
          />
        </div>

        <div className="mb-3">
    
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e)=> {setPasswordReg(e.target.value)}}
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
         <button  type="button" className="btn btn-secondary" onClick ={web3Handler}>
            Register Wallet Address ({addressReg.slice(0, 5) + '...' + addressReg.slice(38, 42)})
          </button>
          <br/>
        
          <button type="button" className="btn btn-primary" onClick ={register}>
            Sign Up
          </button>
        </div>

    
      </form>

    )
  
}

export default Register