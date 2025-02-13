import React, { useState } from "react";
import LoginPage from "./Login";
import SignUpPage from "./Signup";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col">

      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-50 h-15" />
        </div>
        <div className="space-x-4">
          <button
            className="px-4 py-2 border border-gray-700 text-gray-700 rounded-md hover:bg-gray-100"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={() => setShowSignUp(true)}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative flex-1 flex items-center justify-center bg-gray-900 text-white ${showLogin || showSignUp ? 'blur-sm' : ''}`}>

        <img
          src="/assets/hero-bg.jpg"
          alt="Writing and Books"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative text-center px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
            Human Stories & Ideas
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            A place to read, write, and deepen your knowledge.
          </p>
          <button
            className="px-6 py-3 bg-black text-white text-lg rounded-md hover:bg-gray-800"
            onClick={() => setShowLogin(true)}
          >
            Start Reading
          </button>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LoginPage setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SignUpPage setShowSignUp={setShowSignUp} setShowLogin={setShowLogin}/>
        </div>
      )}
    </div>
  );
}
