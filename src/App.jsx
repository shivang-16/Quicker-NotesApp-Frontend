import { useState } from 'react'
import Mainbody from './components/Mainbody'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import { Toaster } from 'react-hot-toast'
import './styles/app.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
   
  return (
   <>
   <Router>
   <Routes>
   
   <Route exact path='/' element={
      <Mainbody/>
    
   
   }/> 
   <Route exact path='/login' element={
      <Login/>
   }/> 
   <Route exact path='/signup' element={
      <SignUp/>
   }/> 
   <Route exact path='/profile' element={
      <Profile/>
   }/> 
  
   </Routes>
   <Toaster/>
   </Router>
   </>
  );
}

export default App;
