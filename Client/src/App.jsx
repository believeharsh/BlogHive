import Navbar from "./components/Navbar"
import React from "react";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Notification from "./pages/Notification";
import Library from "./pages/Library";
import ProtectedRoute from "./context/ProtectedRoute";
import Footer from "./components/Footer"
import BlogDetails from "./pages/BlogDetails";



function App() {
  return (
    <>

      <Navbar />
      <Routes>
        {/* <ProtectedRoute path="/">
            <Route path="/" element={<Home />} />
          </ProtectedRoute> */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />



        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/library" element={<Library />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/blog/Upload" element={<Upload />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
      <Footer/>




    </>
  )
}

export default App
