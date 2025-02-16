import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import formatDate from "../utils/FormateData";

const topics = ["React", "JavaScript", "Web Dev", "MERN", "CSS", "Tailwind"];
const usersToFollow = [
  { id: 1, name: "John Doe", username: "johndoe", profile: "/images/boy_avatar.jpeg" },
  { id: 2, name: "Jane Smith", username: "janesmith", profile: "/images/boy2_avatar.jpeg" },
  { id: 3, name: "David Lee", username: "davidlee", profile: "/images/default_Image.jpeg" }
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const scrollRef = useRef(0);

useLayoutEffect(() => {
  window.scrollTo(0, scrollRef.current); // Restore scroll before render
}, [blogs]); // Runs whenever blogs update

useEffect(() => {
  const fetchBlogs = async () => {
    scrollRef.current = window.scrollY; // Save current scroll position
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(`/blog/getAllBlogs?page=${page}&limit=${limit}`);

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
}, [page]);

  useEffect(() => {
    // Simulating fetching saved blogs (you can replace this with an API call)
    setSavedBlogs(blogs.slice(0, 3)); // Mocking saved blogs
  }, [blogs]);

  return (

    <div className="flex flex-col md:flex-row min-h-screen py-4 container mx-auto px-1 gap-8">
      {/* Left Section: Blogs (Scrollable) */}
      <div className="w-full md:w-2/3 border-r border-gray-300 px-4 h-screen overflow-y-auto no-scrollbar">
        {loading && <Spinner />}
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
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 text-green-500 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* Right Section: Sidebar (Sticky) */}
      <div className="w-full md:w-1/3 space-y-4 h-screen sticky top-0 overflow-y-auto no-scrollbar">
        {/* Recommended Topics */}
        <div className="bg-white p-3 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Recommended Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                className="px-5 py-2 bg-gray-200 text-lg rounded-xl hover:bg-gray-300 transition cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>
          <div className="mt-3 text-left cursor-pointer">
            <button className="text-sm font-light text-gray-700 hover:underline cursor-pointer">
              See more topics
            </button>
          </div>
        </div>

        {/* Who to Follow */}
        <div className="bg-white p-3 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Who to Follow</h2>
          <div className="space-y-3">
            {usersToFollow.map((user) => (
              <div key={user.id} className="flex items-center gap-3 cursor-pointer">
                <img src={user.profile} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
                <button className="ml-auto px-3 py-1 text-black border border-black cursor-pointer text-sm rounded-2xl">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-left cursor-pointer">
            <button className="text-sm font-light text-gray-700 hover:underline">
              See more suggestions
            </button>
          </div>
        </div>

        {/* Recently Saved */}
        <div className="bg-white p-3 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Recently Saved</h2>
          <div className="space-y-3">
            {savedBlogs.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog._id}`}>
                <div className="border-b border-gray-300">
                  <div className="flex items-center gap-3 p-2">
                    <img src={blog.coverImage || "/images/LibraryCover_Image.jpg"} alt={blog.title} className="w-14 h-14 rounded-md" />
                    <div>
                      <p className="font-semibold">{blog.title || "untitled Blog"}</p>
                      <p className="text-gray-500 text-sm">by {blog.createdBy?.fullName || "Unknown"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <span className="text-lg">✨</span>
                    <p className="font-light text-sm text-gray-600">
                      {formatDate(blog.createdAt) || new Date().toISOString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;

