import React, { useState } from "react";
import { FiBell, FiChevronDown, FiSearch, FiUser, FiBarChart2, FiBook, FiLogOut } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[rgba(255,255,255,1)] text-black shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
        <Link to="/">
        <h1 className="text-2xl font-bold">BlogNetwork</h1>
        </Link>
         
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 pl-10"
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
        <Link to="/blog/upload">
        <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            <HiPencilAlt className="mr-2" /> Write
          </button>
        </Link>
       
          <FiBell className="text-2xl cursor-pointer" />
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <FiChevronDown className="ml-2" />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                <ul className="py-2 text-gray-700">
                <Link to="/user/profile">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FiUser /> <span>Profile</span>
                  </li>
                </Link>
                 
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FiBarChart2 /> <span>Stats</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FiBook /> <span>Library</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                    <FiLogOut /> <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

