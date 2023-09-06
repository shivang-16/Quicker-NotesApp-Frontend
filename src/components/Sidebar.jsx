import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import notesimg from '../img/notes.png'
import profileImg from '../img/user.png'
const Sidebar = ({sidebarWidth}) => {
 
    const [active, setActive] = useState(false)

  return (
    <>
    <div className="sidebar" style={{width: sidebarWidth}}>
     <Link to={'/'}>
        <div className='box1'>
          <div className='icon side-active'>
           <img src={notesimg} alt="logo" />
          </div>
          <div className='notes box-active'>
            <p>Notes</p>
          </div>
        </div>
        </Link>
        <Link to={'/profile'}>
        <div className='box1 box2'>
          <div className='icon'>
            <img src={profileImg} alt="Logo" />
          </div>
          <div className='notes'>
            <p>My Profile</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar