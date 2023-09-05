import React, {useState, useContext} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import toast  from 'react-hot-toast'
import { Context } from '../main'
const SignUp = () => {
   
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const {isAuthenticated, setIsAuthenticated, isLoading, setIsLoading} = useContext(Context)
   const handleSubmit= async(e)=>{
      e.preventDefault()
      setIsLoading(true)
      try {
        const { data } = await axios.post(`${server}/users/register`, {
          name, email, password
        }, {
          headers: {
            "Content-Type": 'application/json'
          },
          withCredentials: true,
        });
        toast.success(data.message);
        setIsLoading(false)
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
        setIsAuthenticated(false)
      }
    }
    if(isAuthenticated) return <Navigate to={'/'}/>
     return (
     <>
   {isLoading ? (<Spinner/>) : (
    <div className='login-box'>
    <div className='login-card'>
      <div className="login-header">
        <h1>Signup</h1>
      </div>
      <div className='login-content'>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='login-btn' type='submit'>Submit</button>
        </form>
        <div className='signup-button'>
          <p>Already have account?</p>
          <Link to="/login"><button className='login-btn'>Login</button></Link>
        </div>
      </div>
    </div>
  </div>
   )}
  </>
  )
}

export default SignUp
