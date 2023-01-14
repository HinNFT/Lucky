import { useState } from 'react'
import "./Modal.css";
import Axios from 'axios'
import { Spinner } from 'react-bootstrap'

const ForgotPassword = ({setLogin}) => {


  const[email, setEmail] = useState('')
  const[newPassword, setNewPassword] = useState('')
  const[confirmNewPassword, setConfirmNewPassword] = useState('')
  const[busy, setBusy] = useState(false)
  const[securityQues, setSecurityQues] = useState('')
  const[securityAns, setSecurityAns] = useState('')
  const[step, setStep] = useState(1)


  const showQuestion = () => {
    if (email === '') {
      window.alert("Please insert email to show your security question.")
    } else {
      setBusy(true)
      Axios.post("https://lucky568booo0998boo.info/getsecurityques", {
      email: email,
    }).then((response) => {
         if(response.data.message === "invalid user"){   
          window.alert("invalid user") 
          setBusy(false)
        } else { 

          setSecurityQues(response.data[0].securityquestion)
          setBusy(false)
          setStep(2)
        }
    })
  }}


const submitAnswer = () => {
  if (securityAns === '') {
      window.alert("Please insert answer.")
    } else {
      setBusy(true)
      Axios.post("https://lucky568booo0998boo.info/submitanswer", {
      email: email,
      securityAns: securityAns
    }).then((response) => {
         if(response.data.message === "wrong answer"){   
          window.alert("wrong answer") 
          setBusy(false)
        } else { 
        setSecurityAns(' ')    
        setSecurityQues('')
          
          setBusy(false)
          setStep(3)
        }
    })
  }}



  const changePassword = () => {
    setBusy(true)
    if (newPassword === '') {
      window.alert("Please insert password")
    } else if (newPassword !== confirmNewPassword){
      setBusy(false)
      window.alert("Passwords do not match")
    } else {
      Axios.post("https://lucky568booo0998boo.info/changepassword", {
      email: email,
      newPassword: newPassword
    }).then((response) => {
      if(response.data.message == "successful")
      window.alert("Password changed successfully. Please login.")
    setBusy(false)
    setLogin()
        
    })
  }}



   let content
    if(step === 1) {
      content = 

      <div className = "pass-container">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=> {setEmail(e.target.value)}}
          />
        </div>

        <div className="d-grid">
        <button type="button" className="btn btn-primary" onClick ={showQuestion}>
            Submit Email
          </button>

        </div>

        </div>

    } else if (step === 2) {
      content = 
   <div className ="pass-container">

     <div className="mb-3">
          <input
           type="text"
            className="form-control"
            placeholder="referral"
            readOnly
             value={securityQues}
          />
        </div>


        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your answer here"
          onChange={(e)=> {setSecurityAns(e.target.value)}}            
          />

        </div>
        <div className="d-grid">
         <button type="button" className="btn btn-primary" onClick ={submitAnswer}>
            Submit Answer
          </button>
          </div>
        </div>
       

    } else {
      content =

 <div className = "pass-container">

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new password"
            onChange={(e)=> {setNewPassword(e.target.value)}}
            
          />
        </div>

        <div className="mb-3">  
          <input
            type="text"
            className="form-control"
            placeholder="Confirm new password"
            onChange={(e)=> {setConfirmNewPassword(e.target.value)}}
          />
          </div>

<div className="d-grid">
          
        {busy ? (
          <button type="button" className="btn btn-primary">
            <Spinner animation="border" style={{ display: 'flex', color: 'white'}} />
          </button>) 

        : (
          <button type="button" className="btn btn-primary" onClick ={changePassword}>
            Reset Password
          </button>
       )}

        </div>
       </div>
      
    }



   return (
      <form>

        <div className="text-center">
          <h3>Reset your password</h3>
        </div>
      
      {content}
     
       <div className="d-grid">
          
          <button type="button"
              className="btn btn-light"
              onClick ={setLogin}>
            Back to Login
          </button>
          </div>
        

      </form>

    )
  
}

export default ForgotPassword