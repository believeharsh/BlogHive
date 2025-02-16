import React, { useState } from "react";
import { FiBell, FiChevronDown, FiChevronUp, FiUser, FiBook, FiLogOut } from "react-icons/fi";
import { TiDocumentText } from "react-icons/ti";
import { IoStatsChartOutline } from "react-icons/io5";
import { HiPencilAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserProfileData } from "../context/userContext";
import Spinner from "./Spinner";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const { setBlogs, setUserProfileData, userProfileData } = useUserProfileData();
  const blogHiveUser = localStorage.getItem("BlogHiveUser");

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axiosInstance.get("/user/logout");
      logout();
      setBlogs([]);
      setUserProfileData([]);
      localStorage.removeItem("BlogHiveUser");
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  // Dropdown menu items
  const dropdownItems = [
    { name: "Profile", icon: <FiUser />, path: `/${blogHiveUser}` },
    { name: "Library", icon: <FiBook />, path: "/library" },
    { name: "Stories", icon: <TiDocumentText />, path: ""},
    { name: "Stats", icon: <IoStatsChartOutline />, path: ""},
    { name: "Logout", icon: <FiLogOut />, action: logoutUser },

  ];

  return (
    <nav className="bg-white text-black border-b border-gray-300 p-1 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-40 h-auto" />
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-7">
          <Link to="/blog/upload">
            <button className="flex items-center text-gray-800 text-xl px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black">
              <HiPencilAlt className="mr-2" /> Write
            </button>
          </Link>

          <Link to="/notifications">
            <FiBell className="text-2xl cursor-pointer" />
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img
                src={userProfileData.profileImageURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              {isDropdownOpen ? <FiChevronDown className="ml-2" /> : <FiChevronUp className="ml-2" />}
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10">
                <ul className="py-2 text-gray-700">
                  {dropdownItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      onClick={() => {
                        if (item.action) {
                          item.action(); 
                        } else {
                          navigate(item.path); 
                        }
                        setIsDropdownOpen(false); 
                      }}
                    >
                      {item.icon} <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loader Overlay */}
      {loading && <Spinner />}
    </nav>
  );
};

export default Navbar;
