import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    axios
      .post("/user/signup", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        console.log("User is registered successfully");
        console.log(res);
        navigate("/");
        setFullName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("User already exists with this email. Please login.");
        } else {
          console.error("Signup error:", err);
          console.error("Error response:", err.response);
          alert("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-white to-gray-200">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Sign Up for BlogNetwork
        </h2>
        <form onSubmit={handleSignUp}>
          {/* Full Name & Email - Two Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Avatar & Password - Two Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
