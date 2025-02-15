import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Your Blogs");
  const { userProfileData, loading, blogs = [] } = useUserProfileData();
  const { savedBlogsByUser = [] } = useBlogs();
  const { username, fullName, profileImageURL, createdAt } = userProfileData;

  const Following = [
    { id: 1, name: "John Doe", username: "johndoe", profile: "/images/boy_avatar.jpeg" },
    { id: 2, name: "Jane Smith", username: "janesmith", profile: "/images/boy2_avatar.jpeg" },
    { id: 3, name: "David Lee", username: "davidlee", profile: "/images/default_Image.jpeg" }
  ];

  if (loading) {
    return <Spinner />;
  }

  const renderContent = () => {
    if (activeTab === "Your Blogs") {
      if (blogs.length === 0) {
        return <div className="  py-4 text-center">You haven't written any blogs yet.</div>;
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
      if (!Array.isArray(savedBlogsByUser) || savedBlogsByUser.length === 0) {
        return <div className=" py-4 text-center">You haven't saved any blogs yet.</div>;
      }

      return savedBlogsByUser.map((savedBlog) => (
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

    return <div className="border-b border-gray-300 py-4 text-center">No content for this tab.</div>;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen py-6 container mx-auto px-4 gap-8">

      <div className="w-full md:w-2/3 border-r border-gray-300 px-4 h-screen overflow-y-auto no-scrollbar">
        <ProfileHeader userProfileData={userProfileData} />
        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-white p-4 rounded-lg ">
          <div className="container mx-auto flex flex-col items-center w-full">
            <div className="w-full max-w-3xl mt-4">{renderContent()}</div>
          </div>
        </div>
        
      </div>

      <div className="w-full md:w-1/3 space-y-6 py-6 h-screen sticky top-0 overflow-y-auto no-scrollbar">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <img src={profileImageURL} alt="" className="w-32 h-32 rounded-full border border-gray-300" />
          <p className="font-semibold text-lg mt-3">{fullName}</p>
          <p className="text-gray-500 text-sm">100k Followers</p>
          <p className="text-sm text-gray-600 mt-1 px-2">
            Enthusiast in Programming and Web Development | Learner | Bontinue
          </p>
          <button className="text-green-600 hover:underline text-sm mt-2">Edit profile</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Following</h2>
          <div className="space-y-4">
            {Following.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <Link className="flex items-center gap-3">
                  <img src={user.profile} alt="" className="h-10 w-10 rounded-full" />
                  <p className="text-sm font-medium">{user.name}</p>
                </Link>
                <button className="text-gray-500 hover:text-black cursor-pointer">
                  <BiDotsVerticalRounded />
                </button>
              </div>
            ))}
          </div>
          <button className="text-green-600 text-sm mt-4 hover:underline">See all ({Following.length})</button>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-light text-gray-600 py-6 justify-center">
          {[
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Teams"
          ].map((item, index) => (
            <p key={index} className="cursor-pointer hover:underline">{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


