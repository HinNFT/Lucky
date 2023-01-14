import { useState, useEffect} from 'react'
import "./Modal.css";
import Axios from 'axios'
import { Spinner } from 'react-bootstrap'

const Register = ({accountReg, web3Handler, setLogin, closeLogReg, settingLoginData}) => {
  const[emailReg, setEmailReg] = useState('')
  const[passwordReg, setPasswordReg] = useState('')
  const[ConfirmPasswordReg, setConfirmPasswordReg] = useState('')
  const[refCodeReg, setRefCodeReg] = useState('')
  const[busy, setBusy] = useState(false)

  const searchParams = new URLSearchParams(document.location.search)

  const register = () => {

    if (refCodeReg === '') {
      window.alert("No referral code inserted! Please get referral link from a user to sign up. ")
    } else {
      setBusy(true)

    if(passwordReg === ConfirmPasswordReg) {
      Axios.post("https://lucky568booo0998boo.info/register", {
      email: emailReg,
      password: passwordReg,
      referrer: refCodeReg,
      account: accountReg
    }).then((response) => {
     if(response.data.message === "Registration successful. Please Login."){

       Axios.post("https://lucky568booo0998boo.info/login", {
      email: emailReg,
      password: passwordReg
    }).then((response) => {
      if(response.data.message){
        window.alert(response.data.message)
      } else {
        settingLoginData(response.data[0])
        closeLogReg()
        setBusy(false)
        window.alert(`Registration successful, Logged in as '${response.data[0].email}'`)  

           }
    })
        
      } else {
        setBusy(false)
        window.alert(response.data.message)


      }  
      })
    } else {
      setBusy(false)
      window.alert("Passwords don't match!")
    }


    }
    
    
    }

    useEffect(()=> {
    setRefCodeReg(searchParams.get('ref'))
  }, [])
  
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
            placeholder="referral code"
            readOnly
             value={refCodeReg}
          />
        </div>
        <div className="d-grid">
        
        
        {busy ? (<button type="button" className="btn btn-primary">
            <Spinner animation="border" style={{ display: 'flex', color: 'white'}} />
          </button>) 

        : (<button type="button" className="btn btn-primary" onClick ={register}>
            Sign Up
          </button>)}
          
          <button type="button"
              className="btn btn-light"
              onClick ={setLogin}>
            Already registered? Login
          </button>
        </div>
        

          

    
      </form>

    )
  
}

export default Register