import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegComment, FaBookmark, FaShareAlt, FaEllipsisH } from "react-icons/fa";
import AddNewComment from "../components/AddNewComment";
import CommentCard from "../components/CommentCard";
import SharePage from "../components/ShareBlog";
import { useBlogs } from "../context/BlogContext";


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

const handleDeleteBlog = async (blogid) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        await axios.delete(`/blog/${blogid}`);
        alert("Blog deleted successfully!");
        window.location.href = "/"; // Redirect after deletion
    } catch (error) {

        console.error("Error deleting blog:", error.response?.data?.message || error.message);
        alert("Failed to delete blog.");
    }
}



const BlogDetails = () => {
    const [blog, setBlogs] = useState(null);
    const { savedBlogsByUser, userId, setSavedBlogsByUser } = useBlogs();
    const [comments, setComments] = useState([]);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUserIsAuthor, setisUserIsAuthor] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlogById = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/blog/${id}`)
                if (!res) {
                    console.log("blog not found By id");
                }
                // console.log(res);
                setBlogs(res.data.blog);
                setComments(res.data.comments)

                setisUserIsAuthor(res.data.isAuthor)
                setLoading(false);
            }
            catch (error) {
                console.error(error || "blog not found by Id");
            }
        }
        fetchBlogById()
    }, []);

    const addNewCommentToState = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    const handleSaveBlog = async (blogId, userId) => {
        try {
            if (!blogId || !userId) {
                console.log("Blog ID and User ID are required");
                return;
            }

            const response = await axios.post(
                `/blog/saveBlog/${blogId}`,
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.data || !response.data.data) {
                console.log("Blog is not saved due to an error!");
                return;
            }

            const newSavedBlog = response.data.data; // Extract the actual saved blog object

            console.log(newSavedBlog);

            // ✅ Update state here for giving the real time changes
            setSavedBlogsByUser((prevBlogs) => [...prevBlogs, newSavedBlog]);

            console.log(savedBlogsByUser);
        } catch (error) {
            console.error("Error occurred while saving the blog:", error.response?.data || error.message);
        }
    };


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
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog?.title}</h1>

                        {/* User Profile Section */}
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={blog?.createdBy?.profileImageURL}
                                alt={blog?.createdBy?.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{blog?.createdBy?.fullName}</p>
                                <p className="text-sm text-gray-500">{formatDate(blog?.createdAt)}</p>
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
                                <button className="text-gray-600 hover:text-gray-900"
                                    onClick={() => handleSaveBlog(id, userId)}
                                >
                                    <FaBookmark className="w-5 h-6" />
                                </button>

                                {/* Share Button */}
                                <button className="text-gray-600 hover:text-gray-900"
                                    onClick={() => setIsShareOpen(true)}
                                >
                                    <FaShareAlt className="w-5 h-6" />
                                </button>

                                {/* Three-Dot Dropdown */}
                                <div className="relative">
                                    {/* Three-Dot Button */}
                                    <button
                                        className="text-gray-600 hover:text-gray-900"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <FaEllipsisH className="w-5 h-6" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
                                            {isUserIsAuthor && (
                                                <button
                                                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                                                    onClick={() => handleDeleteBlog(id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                            <button
                                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                                onClick={() => console.log("Report Story")}
                                            >
                                                Report Story
                                            </button>
                                            <button
                                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                                onClick={() => console.log("Follow Author")}
                                            >
                                                Follow Author
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="mb-6 mt-4">
                            <img
                                src={blog?.coverImage}
                                alt="Blog cover"
                                className="w-full h-80 object-cover rounded-md"
                            />
                        </div>

                        {/* Blog Content */}
                        <div className="prose prose-lg text-gray-700 py-2">
                            <p>{blog?.body}</p>
                        </div>

                        <AddNewComment blogId={id} addNewCommentToState={addNewCommentToState} />

                        {
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <CommentCard key={comment._id} comment={comment} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No comments yet.</p>
                                )}
                            </div>
                        }

                        {isShareOpen && <SharePage blogUrl={`https://bloghive-lac.vercel.app/blog/${id}`} onClose={() => setIsShareOpen(false)} />}



                    </div>
                )
            }


        </>

    );
};

export default BlogDetails;
