import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfileData } from '../context/userContext';
import axiosInstance from '../utils/axiosInstance';
import { ImSpinner8 } from 'react-icons/im';

const LoginPage = ({ setShowLogin, setShowSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, setRole } = useAuth();
  const { refreshUserData } = useUserProfileData();

  const redirectToSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/signin", { email, password }, { headers: { "Content-Type": "application/json" } });
      setRole(res.data.data.role);
      login();
      await refreshUserData();
      navigate("/");
      setEmail("");
      setPassword("");
      setShowLogin(false);
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "An error occurred during login");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur-lg z-50">
      <div className="w-full max-w-lg bg-white text-black p-10 rounded-3xl shadow-2xl relative flex flex-col items-center">
        <button onClick={() => setShowLogin(false)} className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-4xl font-extrabold text-center mb-6">Welcome Back</h2>
        <p className="text-gray-600 mb-8 text-center text-lg">Sign in to continue exploring amazing content</p>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="relative w-full">
            <input
              type="email"
              className={`w-full p-4 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
            />
            <FiUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 text-xl" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-4 bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-lg`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-black"
            >
              {showPassword ? <FiEyeOff className="text-xl cursor-pointer" /> : <FiEye className="text-xl cursor-pointer" />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-4 bg-black text-white rounded-lg text-xl font-semibold hover:bg-gray-900 transition-all flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                Logging you in
                <ImSpinner8 className="animate-spin text-2xl text-green-600 ml-4" />
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-lg">
          Don’t have an account?
          <span onClick={redirectToSignUp} className="text-black font-semibold cursor-pointer hover:underline"> Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

