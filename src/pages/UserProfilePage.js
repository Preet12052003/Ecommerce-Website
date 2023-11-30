import React from 'react'
import UserProfile from '../features/user/components/UserProfile'
import NavBar from '../features/navbar/NavBar'

const UserProfilePage = () => {
  return (
    <NavBar>
        <UserProfile />
    </NavBar>
  )
}

export default UserProfilePage