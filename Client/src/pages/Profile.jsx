import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditProfilePage from "./EditProfile";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Your Blogs");
  const [isEditing, setIsEditing] = useState(false);
  const { userProfileData, loading, blogs = [] } = useUserProfileData();
  const { savedBlogsByUser = [] } = useBlogs();
  const { username, fullName, profileImageURL, about } = userProfileData;
    const IsUserHasProfileImage = userProfileData.profileImageURL === "/public/Images/defaultImage.png"

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
      return blogs.length === 0 ? (
        <div className="py-4 text-center">You haven't written any blogs yet.</div>
      ) : (
        blogs.map((blog) => (
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
        ))
      );
    }
    if (activeTab === "SavedBlogs") {
      return !Array.isArray(savedBlogsByUser) || savedBlogsByUser.length === 0 ? (
        <div className="py-4 text-center">You haven't saved any blogs yet.</div>
      ) : (
        savedBlogsByUser.map((savedBlog) => (
          <Link key={savedBlog._id} to={`/blog/${savedBlog.savedBlogId._id}`}>
            <BlogCard
              authorName={savedBlog.savedBlogId.createdBy?.fullName || "Unknown Author"}
              profileImageURL={savedBlog.savedBlogId.createdBy?.profileImageURL || "/images/boy_avatar.jpeg"}
              username={savedBlog.savedBlogId.createdBy?.username || "anonymous"}
              title={savedBlog.savedBlogId.title || "Untitled Blog"}
              body={savedBlog.savedBlogId.body || "No content available"}
              coverImage={savedBlog.savedBlogId.coverImage || "/images/LibraryCover_Image.jpg"}
              createdAt={savedBlog.savedBlogId.createdAt || new Date().toISOString()}
            />
          </Link>
        ))
      );
    }
    return <div className="border-b border-gray-300 py-4 text-center">No content for this tab.</div>;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen py-6 container mx-auto px-4 gap-8">
      <div className="w-full md:w-2/3 00 px-4 h-auto md:h-screen overflow-y-auto no-scrollbar">
        <ProfileHeader userProfileData={userProfileData} />
        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-white p-4 rounded-lg w-full">{renderContent()}</div>
      </div>

      <div className="w-full md:w-1/3 space-y-6 py-6 md:h-screen md:sticky md:top-0 overflow-y-auto no-scrollbar md:border-l md:border-gray-300">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center ">
          <img src={ IsUserHasProfileImage ?  "/images/default_Image.jpeg" : userProfileData.profileImageURL} alt="" className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-300" />
          <p className="font-semibold text-lg mt-3">{fullName}</p>
          <p className="text-gray-500 text-sm">100k Followers</p>
          <p className="text-sm text-gray-600 mt-1 px-2">{about}</p>
          <button onClick={() => setIsEditing(true)} className="cursor-pointer text-green-600 hover:underline text-sm mt-2">
            Edit profile
          </button>
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
          <button className="cursor-pointer text-green-600 text-sm mt-4 hover:underline">See all ({Following.length})</button>
        </div>
      </div>
      {isEditing && <EditProfilePage onCancle={() => setIsEditing(false)} />}
    </div>
  );
};

export default ProfilePage;