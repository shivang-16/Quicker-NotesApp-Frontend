import React, { useContext, useEffect } from 'react';
import notebook from '../img/notebook.png';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import profileImg from '../img/profile.png'

const Navbar= ()=> {
  
  const {isAuthenticated, setIsAuthenticated, setProfile, setIsLoading, sidebarWidth, setSidebarWidth} = useContext(Context)
  
 
  const handleProfile = async()=>{
    setIsLoading(true)
      try {
        const {data} = await axios.get(`${server}/users/me`,{
          withCredentials: true,
        })
        setProfile(data.user);
        
        setIsAuthenticated(true)
        setIsLoading(false)
       
      } catch (error) {
        setIsAuthenticated(false)
        toast.error(error.response.data.message)
        setProfile({});
        setIsLoading(false)
      }
  }
  const navigate = useNavigate()
  const handleLogout = async()=>{
    confirm("Are you sure you want to logout?")
      try {
        const {data} = await axios.get(`${server}/users/logout`,{
         withCredentials: true,
        })
        toast.success(data.message)
        navigate('/login')
        setIsAuthenticated(false)
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(true);
      }
  }
 
  const handleLogin=()=>{
    setIsLoading(false)
  }

  const handleBurger=()=>{
    if(sidebarWidth === '70px')
       setSidebarWidth('300px')
    else
       setSidebarWidth('70px')  
  }

  useEffect(() => {
    handleProfile()
  }, [])
  
    return (
    <div className="navbar">
      <div className="nav-left nav-box">
        <div className="burger" onClick={handleBurger}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <Link to={'/'}>
        <div className='brand'>
        <div className="logo-img">
          <img src={notebook} alt="Notebook" />
        </div>
        <div className="logo-txt">
          <h1>Quicker</h1>
        </div>
        </div>
        </Link>
      
      </div>
     
      <div className="nav-right nav-box">
        {isAuthenticated === true ?(
          <div className='nav-right-content'>
      
        <Link to="/profile"> 
        <div className='profile' onClick={handleProfile}>
        <img src={profileImg} alt=""  style={{height:'100%', width: '100%'}}/>
        </div>
        </Link>
       <button className="detail-btn" onClick={handleLogout}>Logout</button>
        </div>
     
        ) : (
        <Link to="/login"><button className="detail-btn" onClick={handleLogin}>Login</button></Link>
        )
        }
      </div>
    </div>
  );
  }
 
  export default Navbar;


  
 
