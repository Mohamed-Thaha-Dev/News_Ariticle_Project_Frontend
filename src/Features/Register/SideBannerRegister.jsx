import React from 'react'
import { assects } from '../../assets/Assets'

const SideBannerRegister = () => {
  return (
     <div className="flex flex-col bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 mt-15 rounded text-white p-10">
            <div className="flex flex-col items-center md:mt-[30%]">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <img
                  src={assects.companyLogo} // replace with your logo path
                  alt="Logo"
                  className="w-16 h-16 object-cover  rounded"
                />
              </div>
              <h2 className="text-3xl font-bold mt-6">Welcome Back</h2>
              <h3 className="text-2xl font-semibold">Ilayankudi News</h3>
              <p className="mt-3 text-center text-gray-200 max-w-md">
                Your daily dose of trusted news, just a login away.
              </p>
              
            </div>
          </div>
  )
}

export default SideBannerRegister