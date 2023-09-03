import React, { useState } from 'react';
import notebook from '../img/notebook.png';
import { Link } from 'react-router-dom';


const Navbar= ({sidebarWidth, setSidebarWidth})=> {
  
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
        <Link to="/login"><button className="detail-btn">Login</button></Link>
        <Link to="/signup"><button className="detail-btn">SignUp</button></Link>
       
      </div>
    </div>
  );
  }
 
  export default Navbar;


  
 
