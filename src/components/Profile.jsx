import React, { useContext, useEffect } from 'react'
import { Context, server } from '../main'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Spinner from './Spinner'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import profileImg from '../img/profile.png'

const Profile = () => {
  const {
    profile,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    refresh, 
    setRefresh
  } = useContext(Context)

   const navigate = useNavigate()
  const handleDeleteUser = async () => {
    setIsLoading(true)
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const {data} = await axios.delete(`${server}/users/${profile._id}`, {
          withCredentials: true,
        })
        setIsLoading(false)
        setRefresh(prev=>!prev)
        navigate('/login')
        setIsAuthenticated(false)
        toast.success(data.message)
      } catch (error) {
        toast.error("Error")
        setIsLoading(false)
        setIsAuthenticated(true) 
      }
    } else {
      setIsLoading(false)
    }
  }
   
  useEffect(() => {
  //  handleDeleteUser()
  }, [refresh])
  
  
  return (
    <>
      <Navbar />
      <main id='main-body'>
        <Sidebar />

        <div className='profile-page-area'>
          {isLoading ? (
            <Spinner />
          ) : profile ? (
            <div className='profile-section'>
              <img src={profileImg} alt='' />
              <h3>{profile.name}</h3>
              <h4>{profile.email}</h4>
              <p>{profile.createdAt}</p>

              <button
                className='login-btn'
                disabled={isLoading || !isAuthenticated}
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>
            </div>
          ) : (
            "Unable to fetch profile page"
          )}
        </div>
      </main>
    </>
  )
}

export default Profile
