import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Sidebar with framer-motion */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 h-full w-80  bg-gray-100 shadow-lg z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={onClose}>
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 p-4 text-lg font-medium">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/news" className="hover:text-blue-600">News</Link>
              <Link to="/restaurant" className="hover:text-blue-600">Restaurant</Link>

              <input
                type="text"
                placeholder="Search Yours"
                className="px-4 py-2 rounded-lg border focus:outline-none"
              />
              <button className="px-4 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 shadow">
               <Link to="/login">Login</Link> 
              </button>
            </div>
          </motion.div>

          {/* Overlay with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
