/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "import.meta.env.VITE_API_BASE_URL";

const SignUpPage = () => {
  const nevigate = useNavigate() ; 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
   
    axios
    .post("/user/signup", { email, password, fullName })
    .then((res) => {
        console.log("user is registered successfully"); 
        console.log(res); 
        nevigate("/")
        setFullName("");
        setEmail("");
        setPassword(""); 
    })
    .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("User already exists. Please login.");
        } else {
          console.error("Signup error:", err);
          console.error("Error response:", err.response);
          alert("An error occurred. Please try again.");
        }
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-white to-gray-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Sign Up for BlogNetwork</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-700">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
