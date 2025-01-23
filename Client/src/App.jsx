import Navbar from "./components/Navbar"
import React from "react" ; 
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <div className="">
       
        <Navbar/>
        <BrowserRouter>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
