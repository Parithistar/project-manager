import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const Private = () => {
    const auth=localStorage.getItem("user")

  return (
    auth ? <Outlet/>:<Navigate to={'/'}/>
  )
}

export default Private