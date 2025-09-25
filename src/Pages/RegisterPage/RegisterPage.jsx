import React from 'react'
import Register from '../../Features/Register/Register'
import SideBannerRegister from '../../Features/Register/SideBannerRegister'

export const RegisterPage = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
            {/* Left Side */}
       <SideBannerRegister/>
       <Register/>
     </div>
  )
}
