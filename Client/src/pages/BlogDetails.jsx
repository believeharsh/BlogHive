import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import Spinner from "../components/Spinner";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const BlogDetails = () => {
    const [blog, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchBlogById = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/blog/${id}`)
                if (!res) {
                    console.log("blog not found By id");
                }
                console.log(res);
                setBlogs(res.data.blog);
                setLoading(false);
            }
            catch (error) {
                console.error(error || "blog not found by Id");
            }
        }
        fetchBlogById()
    }, []);
    return (

        <>
            {
                loading && (
                    <Spinner />
                )
            }
            {
                !(loading) && (
                    <div className="max-w-3xl mx-auto px-4 py-6">
                        {/* Blog Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                        {/* Cover Image */}
                        <div className="mb-6">
                            <img
                                src={blog.coverImage}
                                alt="Blog cover"
                                className="w-full h-80 object-cover rounded-md"
                            />
                        </div>

                        {/* Blog Body */}
                        <div className="prose prose-lg text-gray-700">
                            <p>{blog.body}</p>
                        </div>

                        {/* Blog Footer */}
                        <div className="flex items-center justify-between mt-8 text-sm text-gray-500">
                            {/* Left: Created Date */}
                            <span>{blog.createdAt}</span>

                            {/* Right: Save Button and Dropdown */}
                            <div className="flex items-center gap-4">
                                {/* Save Button */}
                                <button className="text-gray-600 hover:text-gray-900">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.25 3.75h13.5m-13.5 0L12 17.25 18.75 3.75"
                                        />
                                    </svg>
                                </button>

                                {/* Three Dot Dropdown */}
                                <button className="text-gray-600 hover:text-gray-900">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 9l6 6 6-6"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


        </>

    );
};

export default BlogDetails;
