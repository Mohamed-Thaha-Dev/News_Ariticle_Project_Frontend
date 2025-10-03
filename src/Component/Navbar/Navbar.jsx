import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../SideNavbar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { assects } from "../../assets/Assets";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let Navigate = useNavigate()

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-200 py-4 shadow fixed top-0 left-0 right-0 z-50 rounded">
        <div className="container mx-auto flex items-center justify-between px-4 max-h-10">
          {/* Logo */}
          <img className = "w-auto h-15 max-h-30 md:w-15 md:h-15 rounded-full object-contain " src = {assects.companyLogo} />

          {/* Desktop Nav */}
       <div className="hidden md:flex gap-8 text-lg text-black font-medium">
  <Link 
    to="/" 
    className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Home
  </Link>
  <Link 
    to="/restaurant" 
    className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Restaurant
  </Link>
  <Link 
    to="/upload" 
    className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Upload
  </Link>
  <Link 
    to="/restaurant" 
    className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Notifications
  </Link>
  <Link 
    to="/userAccount" 
    className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Account
  </Link>
</div>


          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-gray-400 shadow" onClick={()=>Navigate("/login")} >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-300"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
