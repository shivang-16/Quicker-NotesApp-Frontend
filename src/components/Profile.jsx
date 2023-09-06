import React, {useContext} from 'react'
import { Context } from '../main'
import Spinner from './Spinner'
import Navbar from './Navbar'

const Profile = () => {
 
    const {profile, isLoading} = useContext(Context)
   
  return (
   <>
     <Navbar/>
   <div className='profile-page-area'>
   {isLoading? (<Spinner/>
   ) : (
    profile ? ( <div className='profile-section'>
    <h3>{profile.name}</h3>
    <h4>{profile.email}</h4>
    <p>{profile.createdAt}</p>
</div>
):("Unable to fetch profile page")
   )}
   </div>
   </>
  )
}

export default Profile