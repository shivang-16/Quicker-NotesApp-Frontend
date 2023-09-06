import React, {useContext} from 'react'
import { Context } from '../main'
import Spinner from './Spinner'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import profileImg from '../img/profile.png'
const Profile = () => {
 
    const {profile, isLoading} = useContext(Context)
   
  return (
   <>
     <Navbar/>
     <main id='main-body'>
     <Sidebar/>
   
   <div className='profile-page-area'>
   {isLoading? (<Spinner/>
   ) : (
    profile ? ( <div className='profile-section'>
      <img src={profileImg} alt=""/>
    <h3>{profile.name}</h3>
    <h4>{profile.email}</h4>
    <p>{profile.createdAt}</p>
</div>
):("Unable to fetch profile page")
   )}
   </div>
   </main>
   </>
  )
}

export default Profile