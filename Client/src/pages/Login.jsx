import React, { useState } from 'react';
import axios from "axios";
import { FiUser, FiLock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const LoginPage = () => {
    const nevigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/user/signin", { email, password });
            console.log("Full server response:", res);
            console.log("Response data:", res.data);
            nevigate("/")
            setEmail("");
            setPassword("");

        } catch (err) {
            console.error("Login error:", err);
            alert(err.response?.data?.message || err.message || "An error occurred during login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[rgba(255,255,255,1)]">
            <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Login to BlogNetwork</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FiUser className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FiLock className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white font-semibold"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Don’t have an account? <a href="/signup" className="text-white underline hover:text-gray-300">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
