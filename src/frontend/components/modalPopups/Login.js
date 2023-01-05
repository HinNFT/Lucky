import { useState } from 'react';
import "./Modal.css";
import Axios from 'axios'

const Login = ({onClose, settingLoginData}) => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const login = async () => {
    await Axios.post("http://localhost:3001/login", {
      email: email,
      password: password
    }).then((response) => {
      if(response.data.message){
        window.alert(response.data.message)
      } else {
        settingLoginData(response.data[0])
        window.alert(`Logged in as '${response.data[0].email}'`)
        onClose()
           }
    })
  }




    return (
      <form>
      <div className="text-center">
          <h3>Login</h3>
        </div>
        
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
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=> {setPassword(e.target.value)}}
          />
        </div>
        
        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={login}>
            Login
          </button>
        </div>
 
        
      </form>

      
    )
  
}

export default Login

