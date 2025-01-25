/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Website Name */}
          <div className="flex-shrink-0 text-2xl font-bold cursor-pointer">
            BlogNetwork
          </div>

          {/* Center Buttons */}
          <div className="hidden md:flex space-x-8">
            <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
              Profile
            </button>
            <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
              Gallery
            </button>
            <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
              Explore
            </button>
            {/* <Link to={"blog/Upload"}> */}
            <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition-all">
              Post Blog
            </button>
            {/* </Link> */}
           
          </div>

          {/* Right-Side Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-all"
            >
              <span>Menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2">
                <button
                  onClick={() => alert("Logged out!")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex justify-around py-2">
          <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
            Profile
          </button>
          <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
            Gallery
          </button>
          <button className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
            Explore
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition-all">
            Post Blog
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
