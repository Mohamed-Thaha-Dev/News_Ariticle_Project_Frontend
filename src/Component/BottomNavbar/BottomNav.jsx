import React, { useState } from "react";
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { FaHotel, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: <IoMdHome size={20} /> },
    { name: "Restaurant", icon: <FaHotel size={20} /> },
    { name: "Upload", icon: <FaPlus size={20} /> },
    { name: "Notifications", icon: <IoMdNotifications size={20} /> },
    { name: "Account", icon: <CgProfile size={20} /> },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-around border">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            setActiveTab(item.name);

            switch (item.name) {
              case "Home":
                navigate("/");
                break;
              case "Restaurant":
                navigate("/restaurant");
                break;
              case "Upload":
                navigate("/upload");
                break;
              case "Notifications":
                navigate("/register");
                break;
              case "Account":
                navigate("/login");
                break;
              default:
                navigate("/");
            }
          }}
          className={`flex flex-col items-center p-2 ${
            activeTab === item.name ? "text-red-500" : "text-gray-500"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavBar;
