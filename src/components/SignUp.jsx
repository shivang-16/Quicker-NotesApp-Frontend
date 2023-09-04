import React, {useState} from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
   
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
 
  return (
    <div className='login-box'>
    <div className='login-card'>
      <div className="login-header">
        <h1>Signup</h1>
      </div>
      <div className='login-content'>
        <form action="">
        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" name='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" name='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='login-btn' type='submit'>Submit</button>
        </form>
        <div className='signup-button'>
          <p>Already have account?</p>
          <Link to="/login"><button className='login-btn'>Login</button></Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp
