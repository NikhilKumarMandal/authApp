import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    console.log(isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
  return children
}

export default ProtectedRoute