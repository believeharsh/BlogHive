import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post(`/blog/getAllBlogs?page=${page}&limit=${limit}`);
        
        // Prevent duplicate blogs
        const newBlogs = data.blogs.filter(
          (newBlog) => !blogs.some((existingBlog) => existingBlog._id === newBlog._id)
        );

        setBlogs((prev) => [...prev, ...newBlogs]);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [page]); // Fetches blogs whenever `page` changes

  // Load More Handler
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {loading && <Spinner />}

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
          
          {hasMore && (
            <div className="flex justify-center mt-6"> {/* Centering the button */}
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 text-green-500  rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                disabled={loading} // Disable while loading
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
