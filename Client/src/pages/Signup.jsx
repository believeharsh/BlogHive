import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const SignUpPage = ({ setShowSignUp, setShowLogin }) => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth() 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const redirctToLogin = () => {
    setShowSignUp(false)
    setShowLogin(true)
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      if (avatar) {
        formData.append('avatar', avatar);
      }
  
      const res = await axiosInstance.post("/user/signup", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log("User is registered successfully");
      console.log(res);
      setIsAuthenticated(true);
      navigate("/");
      
      // Reset form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setShowSignUp(false);
      
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User already exists with this email. Please login.");
      } else {
        console.error("Signup error:", err);
        console.error("Error response:", err.response);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white  backdrop-blur-lg z-50">
      <div className="w-full max-w-2xl bg-white text-black p-8 rounded-3xl shadow-2xl relative flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => setShowSignUp(false)}
          className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">
          Join BlogHive
        </h2>

        <form onSubmit={handleSignUp}>
          {/* Full Name & Email - Two Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          </div>

          {/* Avatar & Password - Two Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg"
                onChange={(e) => setAvatar(e.target.files[0])}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center items-center">
          <button className="mt-6 text-center text-lg font-semibold text-gray-500">
            Already have an account?{" "}
            <p
              onClick={() => redirctToLogin()}
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Log in
            </p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;



