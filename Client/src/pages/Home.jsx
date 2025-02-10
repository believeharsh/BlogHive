import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {

        const res = await axios.get("/blog");
        console.log(res);
        setBlogs(res.data.data.blogs);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <>
      {
        loading && (
          <Spinner />
        )
      }

      <div className="min-h-screen bg-gray-100 py-8">
        {/* Container for Blogs */}

        <div className="container mx-auto w-full max-w-2xl px-4">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div key={blog._id} className="mb-6">
                <Link to={`/blog/${blog._id}`}>
                  <BlogCard
                    authorName={blog.createdBy.fullName}
                    profileImageURL={blog.createdBy.profileImageURL}
                    username={blog.createdBy.username}
                    title={blog.title}
                    body={blog.body}
                    coverImage={blog.coverImage}
                    createdAt={blog.createdAt}
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
