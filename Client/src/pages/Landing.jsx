// import React, { useState } from "react";
// import LoginPage from "./Login";
// import SignUpPage from "./Signup";

// export default function LandingPage() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   return (
//     <div className="w-full h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-300">
//         <div className="flex items-center space-x-2 cursor-pointer">
//           <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-40 h-auto" />
//         </div>
//         <div className="hidden md:flex space-x-7 px-6">
//           <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer">Our Story</button>
//           <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer">Write</button>
//           <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer" onClick={() => setShowLogin(true)}>
//             Sign In
//           </button>
//           <button className="px-4 py-3 bg-black text-white rounded-2xl text-xl cursor-pointer" onClick={() => setShowSignUp(true)}>
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className={`relative flex-1 flex flex-col md:flex-row items-center md:justify-between px-6 md:px-16 py-12 bg-gray-900 text-white ${showLogin || showSignUp ? 'blur-sm' : ''}`}>
//         {/* Left Text Content */}
//         <div className="relative text-left md:w-1/2">
//           <h2 className="text-5xl md:text-7xl font-extrabold mb-4">Human Stories & Ideas</h2>
//           <p className="text-lg md:text-2xl font-semibold mb-6">A place to read, write, and deepen your knowledge.</p>
//           <button className="px-6 py-3 bg-black text-white text-xl rounded-2xl hover:bg-gray-800" onClick={() => setShowLogin(true)}>
//             Start Reading
//           </button>
//         </div>
        
//         {/* Right Image (Hidden on Small Screens) */}
//         <div className="hidden md:block md:w-1/2">
//           <img src="/assets/hero-bg.jpg" alt="Writing and Books" className="w-full h-auto object-cover rounded-lg shadow-lg" />
//         </div>
//       </div>

//       {/* Modals */}
//       {showLogin && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <LoginPage setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
//         </div>
//       )}
//       {showSignUp && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <SignUpPage setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="w-full py-6 px-10 bg-gray-100 text-gray-700 text-center text-md flex font-semibold justify-between items-center space-y-2">
//         <div className="space-x-4">
//           <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">About</a>
//           <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Terms</a>
//           <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Privacy</a>
//           <a href="#" className="hover:text-gray-900 hover:underline cursor-pointer">Contact</a>
//         </div>
//         <p>&copy; 2025 BlogHive. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }






import React, { useState } from "react";
import LoginPage from "./Login";
import SignUpPage from "./Signup";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className={`w-full h-screen flex flex-col ${showLogin || showSignUp ? 'bg-white opacity-90' : ''}`}>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-300">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src="/assets/bloghive-text-logo.png" alt="Logo" className="w-40 h-auto" />
        </div>
        <div className="hidden md:flex space-x-7 px-6">
          <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer">Our Story</button>
          <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer">Write</button>
          <button className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          <button className="px-4 py-3 bg-black text-white rounded-2xl text-xl cursor-pointer" onClick={() => setShowSignUp(true)}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative flex-1 flex flex-col md:flex-row items-center md:justify-between px-6 md:px-16 py-12 bg-gray-900 text-white`}>
        {/* Left Text Content */}
        <div className="relative text-left md:w-1/2">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4">Human Stories & Ideas</h2>
          <p className="text-lg md:text-2xl font-semibold mb-6">A place to read, write, and deepen your knowledge.</p>
          <button className="px-6 py-3 bg-black text-white text-xl rounded-2xl hover:bg-gray-800" onClick={() => setShowLogin(true)}>
            Start Reading
          </button>
        </div>
        
        {/* Right Image (Hidden on Small Screens) */}
        <div className="hidden md:block md:w-1/2">
          <img src="/assets/hero-bg.jpg" alt="Writing and Books" className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Modals */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white opacity-100">
          <LoginPage setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white opacity-100">
          <SignUpPage setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-6 px-10 bg-gray-100 text-gray-700 text-center text-md flex font-semibold justify-between items-center space-y-2">
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
