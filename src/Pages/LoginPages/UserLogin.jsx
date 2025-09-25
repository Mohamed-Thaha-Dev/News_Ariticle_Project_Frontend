import React from 'react'
import LoginPage from '../../Features/LoginPage/Login.jsx'
import { assects } from '../../assets/Assets.js'
import { Button } from '@mui/material'
import SideBanner from '../../Features/LoginPage/SideBanner.jsx'



const UserLogin = () => {
  return (

     <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
            {/* Left Side */}
        <SideBanner/>
        <LoginPage/>
     </div>
  )
}

export default UserLogin