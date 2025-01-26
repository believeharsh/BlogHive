import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectsCard";


axios.defaults.baseURL = "https://bloghive-server.vercel.app/";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {

        const res = await axios.get("/blog");
        console.log(res) ; 
        setBlogs(res.data.data.blogs); 
        // console.log(blogs)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Blogs</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            
            <ProjectCard
              key={blog._id}
              title={blog.title}
              body={blog.body}
              coverImageURL={blog.coverImageURL}
              
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No blogs found. Create your first blog!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
