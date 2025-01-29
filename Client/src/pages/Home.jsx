import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectsCard";
import Spinner from "../components/Spinner"
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
        <h1 className="text-2xl font-bold text-center mb-6">My Blogs</h1>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {blogs.length > 0 && (
            blogs.map((blog) => (

              <ProjectCard
                key={blog._id}
                title={blog.title}
                body={blog.body}
                coverImage={blog.coverImage}

                createdAt={blog.createdAt}
              />
            ))
          )}
        </div>
      </div>
    </>

  );
};

export default Home;
