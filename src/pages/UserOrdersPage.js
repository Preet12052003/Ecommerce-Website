import React from 'react'
import UserOrder from '../features/user/components/UserOrder'
import NavBar from '../features/navbar/NavBar'

const UserOrdersPage = () => {
  return (
    <NavBar>
        <UserOrder />
    </NavBar>
  )
}

export default UserOrdersPage