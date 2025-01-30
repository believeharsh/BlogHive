/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const ProfilePage = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.get("/user/profile")
        const profiledata = userData.data.data;
        console.log(userData.data.data)
        setUserData(profiledata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBlogsCreatedByUser = async () => {
      setLoading(true)
      try {

        const res = await axios.get("/blog")
        console.log(res);
        if (!res) {
          console.log("no blogs fetched from the api");
        }
        setBlogs(res.data.data.blogs)
        setLoading(false);

      }
      catch (error) {
        console.error("Error fetching user blogs");
      }
    }

    fetchUserData();
    fetchBlogsCreatedByUser();
  }, []);

  if (!userData) {
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
      <ProfileHeader username={userData.fullName} createdAt={userData.createdAt} />

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
