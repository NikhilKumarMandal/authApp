import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Lalo from './components/Lalo'


function Layout() {
    return (
      <>
      <Lalo />
      {/* Header */}
     

     
      {/* Outlet for other routes */}
      <Outlet />

     
    </>
   
  )
}

export default Layout