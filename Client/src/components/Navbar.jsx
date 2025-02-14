import React, { useState } from "react";
import { FiBell, FiChevronDown, FiChevronUp, FiSearch, FiUser, FiBook, FiLogOut } from "react-icons/fi";
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
  const { setBlogs, setUserProfileData } = useUserProfileData();
  const { userProfileData } = useUserProfileData();

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

  return (
    <nav className="bg-white text-black border-b border-gray-300 p-3 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-50 h-15" />
            </div>
          </Link>

        </div>

        {/* Right Section */}
        <div className="flex items-center  gap-7">
          <Link to="/blog/upload">
            <button className="flex items-center  text-gray-800 text-xl px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black ">
              <HiPencilAlt className="mr-2" /> Write
            </button>
          </Link>
          <Link to="/notifications">
            <FiBell className="text-2xl cursor-pointer" />
          </Link>

          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
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
                  <Link to={`/${blogHiveUser}`}>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                      <FiUser /> <span>Profile</span>
                    </li>
                  </Link>
                  <Link to="/library">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                      <FiBook /> <span>Library</span>
                    </li>
                  </Link>

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onClick={logoutUser}
                  >
                    <FiLogOut /> <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loader Overlay */}
      {loading && (
        <Spinner />
      )}
    </nav>
  );
};

export default Navbar;


