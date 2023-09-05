import {useState} from 'react'
import Navbar from './components/Navbar'
import Mainbody from './components/Mainbody'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from 'react-hot-toast'
import './styles/app.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

   const [sidebarWidth, setSidebarWidth] = useState('70px')
  return (
   <>
   <Router>
   <Navbar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth}/>
   <Routes>
   
   <Route exact path='/' element={
      <Mainbody sidebarWidth={sidebarWidth}/>
    
   
   }/> 
   <Route exact path='/login' element={
      <Login/>
   }/> 
   <Route exact path='/signup' element={
      <SignUp/>
   }/> 
  
   </Routes>
   <Toaster/>
   </Router>
   </>
  );
}

export default App;
