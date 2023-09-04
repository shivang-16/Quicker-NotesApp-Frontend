import React from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
   <>
    <div className='login-box'>
      <div className='login-card'>
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className='login-content'>
          <form action="">
          <input type="text" name='email' placeholder='Enter Your Email'/>
          <input type="password" name='password' placeholder='Enter Your Password'/>
          <button className='login-btn' type='submit'>Submit</button>
          </form>
          <div className='signup-button'>
            <p>Do not have account?</p>
            <Link to="/signup"><button className='login-btn'>SignUp</button></Link>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Login