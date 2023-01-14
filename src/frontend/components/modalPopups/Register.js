import { useState, useEffect} from 'react'
import "./Modal.css";
import Axios from 'axios'
import { Spinner } from 'react-bootstrap'

const Register = ({setLogin, closeLogReg, settingLoginData}) => {
  const[emailReg, setEmailReg] = useState('')
  const[passwordReg, setPasswordReg] = useState('')
  const[ConfirmPasswordReg, setConfirmPasswordReg] = useState('')
  const[refCodeReg, setRefCodeReg] = useState('')
  const[busy, setBusy] = useState(false)
  const[securityQues, setSecurityQues] = useState('')
  const[securityAns, setSecurityAns] = useState('')

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
      securityQues: securityQues,
      securityAns: securityAns
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
            placeholder="referral"
            readOnly
             value={refCodeReg}
          />
        </div>
        <div className="d-grid">

        <div className="mb-3">
          
       <select name="security_question" onChange={(e) => {setSecurityQues(e.target.value)}}>
        <option value="">Select security question</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What was the name of your first childhood pet?">What was the name of your first childhood pet?</option>
            <option value="Who was your favorite teacher in school?">Who was your favorite teacher in school?</option>
            <option value="What high school did you attend?">What high school did you attend?</option>
            <option value="What was the make of your first car?">What was the make of your first car?</option>
            <option value="What was your favorite food as a child?">What was your favorite food as a child?</option>
          </select>
            </div>

            <div className="mb-3">
    
          <input
            
            type="text"
            className="form-control"
            placeholder="Security question"
          onChange={(e)=> {setSecurityAns(e.target.value)}}
                 
          />
        </div>
        
        
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