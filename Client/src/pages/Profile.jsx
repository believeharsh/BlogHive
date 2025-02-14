import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Your Blogs");
  const { userProfileData, loading, blogs = [] } = useUserProfileData();
  const { savedBlogsByUser = [], userId } = useBlogs();
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
      if (blogs.length === 0) {
        return <div className="border-b border-gray-300 py-4">You haven't written any blogs yet.</div>;
      }
      return blogs.map((blog) => (
        <Link key={blog._id} to={`/blog/${blog._id}`}>
          <BlogCard
            authorName={blog.createdBy?.fullName || "Unknown Author"}
            profileImageURL={blog.createdBy?.profileImageURL || "/images/boy_avatar.jpeg"}
            username={blog.createdBy?.username || "anonymous"}
            title={blog.title || "Untitled Blog"}
            body={blog.body || "No content available"}
            coverImage={blog.coverImage || "/images/LibraryCover_Image.jpg"}
            createdAt={blog.createdAt || new Date().toISOString()}
          />
        </Link>
      ));
    }

    if (activeTab === "SavedBlogs") {
      if (!Array.isArray(savedBlogsByUser) || savedBlogsByUser.length === 0 ) {
        return <div className="border-b border-gray-300 py-4">You haven't saved any blogs yet.</div>;
      }

      return savedBlogsByUser
        .map((savedBlog) => (
          <Link key={savedBlog._id} to={`/blog/${savedBlog.savedBlogId._id}`}>
            <BlogCard
              authorName={savedBlog.savedBlogId?.createdBy?.fullName || "Unknown Author"}
              profileImageURL={savedBlog.savedBlogId?.createdBy?.profileImageURL || "/images/boy_avatar.jpeg"}
              username={savedBlog.savedBlogId?.createdBy?.username || "anonymous"}
              title={savedBlog.savedBlogId?.title || "Untitled Blog"}
              body={savedBlog.savedBlogId?.body || "No content available"}
              coverImage={savedBlog.savedBlogId?.coverImage || "/images/LibraryCover_Image.jpg"}
              createdAt={savedBlog.savedBlogId?.createdAt || new Date().toISOString()}
            />
          </Link>
        ));
    }

    return <div className="border-b border-gray-300 py-4">No content for this tab.</div>;
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

