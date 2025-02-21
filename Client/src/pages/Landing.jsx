import React, { useState } from "react";
import LoginPage from "./Login";
import SignUpPage from "./Signup";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className={`w-full min-h-screen flex flex-col ${showLogin || showSignUp ? 'bg-white opacity-90' : ''}`}>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-3 md:px-12 py-4 bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-42 md:w-40 h-auto" />
        </div>
        <div className="flex space-x-6">
          <button className="text-lg font-medium text-gray-900 hover:text-black hidden md:inline cursor-pointer">Our Story</button>
          <button className="text-lg font-medium text-gray-900 hover:text-black hidden md:inline cursor-pointer ">Write</button>
          <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer hidden md:inline" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-full text-lg cursor-pointer" onClick={() => setShowSignUp(true)}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <div className="relative flex-1 flex flex-col md:flex-row text-left px-6 md:px-16 py-24 md:py-32 text-white mt-16 md:mt-20 items-start">
        <div className="md:w-1/2">
          <h2 className="text-8xl md:text-6xl font-bold mb-4 tracking-tight   text-black font-stretch-extra-condensed">
            Human Stories & Ideas
          </h2>
          <p className="text-lg md:text-2xl font-medium mb-6 text-black leading-snug">
            A place to read, write, and deepen your knowledge.
          </p>
          <button
            className="px-6 py-3 bg-green-700 text-white text-lg rounded-full hover:bg-green-800 cursor-pointer"
            onClick={() => setShowLogin(true)}
          >
            Start Reading
          </button>
        </div>
        <div className="hidden md:block md:w-1/2 mt-6 md:mt-0">
          <img
            src="/assets/hero-bg.jpg"
            alt="Writing and Books"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>



      {/* Modals */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-90 backdrop-blur-lg">
          <LoginPage setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-90 backdrop-blur-lg">
          <SignUpPage setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-6 px-6 md:px-12 bg-black md:bg-gray-100 text-white md:text-gray-700 text-center text-sm md:text-md font-medium flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">About</a>
          <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Terms</a>
          <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Privacy</a>
          <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Contact</a>
        </div>
        <p>&copy; 2025 BlogHive. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
