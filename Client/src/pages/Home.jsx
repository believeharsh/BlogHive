import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom";
import { useUserProfileData } from "../context/userContext";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
  const [loading, setLoading] = useState(false);
  const {blogs} = useUserProfileData() ; 

  return (
    <>
      {
        loading && (
          <Spinner />
        )
      }

      <div className="min-h-screen py-8">
        {/* Container for Blogs */}

        <div className="container mx-auto w-full max-w-2xl px-4">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div key={blog._id} className="mb-6">
                <Link to={`/blog/${blog._id}`}>
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

              </div>
            ))}
        </div>
      </div>


    </>

  );
};

export default Home;
