import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegComment, FaBookmark, FaShareAlt, FaEllipsisH } from "react-icons/fa";
import { useUserProfileData } from "../context/userContext";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const BlogDetails = () => {
    const [blog, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUserIsAuthor, setisUserIsAuthor] = useState(false) ; 
    const { id } = useParams();

    const { userProfileData } = useUserProfileData() ; 


    if(id === userProfileData?._id){
        console.log("hurre both are same")
    }


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
                setisUserIsAuthor(res.data.isAuthor)
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
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>

                        {/* User Profile Section */}
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={"/images/boy_avatar.jpeg"}
                                // alt={blog.author}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Harsh Dahiya</p>
                                <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                            </div>
                        </div>

                        {/* Interaction Buttons */}
                        <div className="flex items-center justify-between py-4 ">
                            {/* Left: Like & Comment */}
                            <div className="flex items-center gap-6">
                                {/* Like Button */}
                                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                                    <FaHeart className="w-5 h-5" />
                                    <span>Like</span>
                                </button>

                                {/* Comment Button */}
                                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                                    <FaRegComment className="w-5 h-6" />
                                    <span>Comment</span>
                                </button>
                            </div>

                            {/* Right: Save, Share, More Options */}
                            <div className="flex items-center gap-6">
                                {/* Save Button */}
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaBookmark className="w-5 h-6" />
                                </button>

                                {/* Share Button */}
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaShareAlt className="w-5 h-6" />
                                </button>

                                {/* Three-Dot Dropdown */}
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaEllipsisH className="w-5 h-6" />
                                    {
                                        isUserIsAuthor && (
                                            <p className=" text-gray-600">delete</p>
                                        )
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="mb-6 mt-4">
                            <img
                                src={blog.coverImage}
                                alt="Blog cover"
                                className="w-full h-80 object-cover rounded-md"
                            />
                        </div>

                        {/* Blog Content */}
                        <div className="prose prose-lg text-gray-700">
                            <p>{blog.body}</p>
                        </div>
                    </div>
                )
            }


        </>

    );
};

export default BlogDetails;
