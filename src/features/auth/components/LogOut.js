import React, { useEffect } from 'react'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function LogOut() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    useEffect(() => {
        dispatch(signOutAsync(user.id))
    }, [])

    // but the useEffect runs after the page has rendered so we have to delay navigate part
    return (
        <>
            {!user && <Navigate to='/login' />}
        </>
    )
}
