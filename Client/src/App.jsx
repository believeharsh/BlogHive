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
import BlogDetails from "./pages/BlogDetails";
import Layout from "./components/Layout";
import { UserProfileProvider } from "./context/userContext";
import { BlogsProvider } from "./context/BlogContext";


function App() {

  return (
    <>
      <UserProfileProvider>
        <BlogsProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/blog/Upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
              <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
            </Route>

          </Routes>
        </BlogsProvider>
      </UserProfileProvider>

    </>
  )
}

export default App
