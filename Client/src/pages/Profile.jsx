import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";



const ProfilePage = () => {

    const { userProfileData, loading, blogs } = useUserProfileData() ; 
  


  if (!userProfileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>

      {/* Profile Header */}
      <ProfileHeader username={userProfileData.fullName} createdAt={userProfileData.createdAt} />

      {/* Profile Navigation */}
      <ProfileNav />

      {/* Blog List Container */}
      <div className="flex flex-col items-center w-full px-4">
        <div className="w-full max-w-3xl mt-4">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <BlogCard {...blog} />
            </Link>
          ))}
        </div>
      </div>

    </>

  );
};

export default ProfilePage;
