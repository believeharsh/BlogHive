import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";


const ProfilePage = () => {

  const [activeTab, setActiveTab] = useState("Your Blogs"); // Manage active tab state
  const { userProfileData, loading, blogs } = useUserProfileData();
  const { savedBlogsByUser, userId } = useBlogs();


  console.log(savedBlogsByUser)


  if (!userProfileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  // Function to render blogs or saved blogs based on the active tab
  const renderContent = () => {
    if (activeTab === "Your Blogs") {
      return blogs.map((blog) => (
        <Link key={blog._id} to={`/blog/${blog._id}`}>
          <BlogCard {...blog} />
        </Link>
      ));
    }

    if (activeTab === "SavedBlogs") {
      return savedBlogsByUser.map((savedBlog) => (
        <Link key={savedBlog._id} to={`/blog/${savedBlog.savedBlogId._id}`}>
          <BlogCard {...savedBlog.savedBlogId} />
        </Link>
      ));
    }

    return <div>No content for this tab</div>;
  };

  return (
    <>

      <ProfileHeader userProfileData={userProfileData} />

      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      <div className="bg-[rgba(255,255,255,1)] ">
        <div className="container mx-auto flex flex-col items-center w-full px-4">
          <div className="w-full max-w-3xl mt-4">
            {renderContent()} {/* Dynamically rendering the content*/}
          </div>
        </div>
      </div>

    </>
  );
};

export default ProfilePage;