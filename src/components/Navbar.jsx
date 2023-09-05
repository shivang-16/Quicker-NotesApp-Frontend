import React, { useState, useContext } from 'react';
import notebook from '../img/notebook.png';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { Context } from '../main';


const Navbar= ({sidebarWidth, setSidebarWidth})=> {
  
  const {isAuthenticated, setIsAuthenticated} = useContext(Context)
   
  const handleLogout = async()=>{
      try {
        const {data} = await axios.get(`${server}/users/logout`,{
         withCredentials: true,
        })
        toast.success(data.message)
        setIsAuthenticated(false)
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(true);
      }
  }


  const handleOnClick=()=>{
    if(sidebarWidth === '70px')
       setSidebarWidth('300px')
    else
       setSidebarWidth('70px')  
  }
    return (
    <div className="navbar">
      <div className="nav-left nav-box">
        <div className="burger" onClick={handleOnClick}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="logo-img">
          <img src={notebook} alt="Notebook" />
        </div>
        <div className="logo-txt">
          <h1>Quicker</h1>
        </div>
      </div>
      <div className="nav-mid nav-box">
        <input type="search" className="search-bar" placeholder="Search" />
      </div>
      <div className="nav-right nav-box">
        {isAuthenticated === true ?(
        <Link to="/login"><button className="detail-btn" onClick={handleLogout}>Logout</button></Link>
        ) : (
        <Link to="/login"><button className="detail-btn">Login</button></Link>
        )
        }
       

       
      </div>
    </div>
  );
  }
 
  export default Navbar;


  
 
