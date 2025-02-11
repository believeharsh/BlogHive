import React, { useState } from "react";
import { FiBell, FiChevronDown, FiSearch, FiUser, FiBook, FiLogOut } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useUserProfileData } from "../context/userContext";
import Spinner from "./Spinner";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const { logout } = useAuth();
  const { setBlogs, setUserProfileData } = useUserProfileData();
  const blogHiveUser = localStorage.getItem("BlogHiveUser");

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axios.get("/user/logout");
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
    <nav className="bg-white text-black shadow-md p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h1 className="text-4xl font-serif">BlogHive</h1>
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
          <Link to="/notifications">
            <FiBell className="text-2xl cursor-pointer" />
          </Link>

          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="/images/default_Image.jpeg"
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <FiChevronDown className="ml-2" />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
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
        <Spinner/>
      )}
    </nav>
  );
};

export default Navbar;


