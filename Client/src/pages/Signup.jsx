import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { ImSpinner8 } from 'react-icons/im';

const SignUpPage = ({ setShowSignUp, setShowLogin }) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const redirectToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const validateForm = () => {
    let errors = {};
    if (!fullName.trim()) errors.fullName = "Full Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    if (!password.trim()) errors.password = "Password is required.";
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
  
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
  
      setIsAuthenticated(true);
      navigate("/");
  
      // Reset form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setShowSignUp(false);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ email: "User already exists with this email. Please login." });
      } else {
        console.error("Signup error:", err);
        setErrors({ general: "An error occurred. Please try again." });
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur-lg z-50">
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
          {/* Full Name & Email */}
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
              />
               {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
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
              />
               {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* Avatar & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar (Optional)
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="cursor-pointer w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg"
                onChange={(e) => setAvatar(e.target.files[0])}
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
              />
               {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="cursor-pointer w-full mt-6 py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                Registering you...
                <ImSpinner8 className="animate-spin text-2xl text-white ml-4" />
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="flex justify-center items-center">
          <button className="mt-6 text-center text-lg font-semibold text-gray-500">
            Already have an account?{" "}
            <p
              onClick={redirectToLogin}
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
