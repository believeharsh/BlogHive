import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import AddNewComment from "../components/AddNewComment";
import CommentCard from "../components/CommentCard";
import SharePage from "../components/ShareBlog";
import { useBlogs } from "../context/BlogContext";
import formatDate from "../utils/FormateData";
import BlogBody from "../components/BlogBody";
import BlogInteractions from "../components/BlogInteractions";
import BlogAuthorInfo from "../components/BlogAuthorInfo";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const BlogDetails = () => {
    const [blog, setBlogs] = useState(null);
    const { savedBlogsByUser, userId, setSavedBlogsByUser } = useBlogs();
    const [comments, setComments] = useState([]);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUserIsAuthor, setisUserIsAuthor] = useState(false);
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Checking if the blog is already saved or not?
        setIsSaved(savedBlogsByUser.some(blog => blog.savedBlogId._id === id));
    }, [savedBlogsByUser, id]);

    useEffect(() => {
        const fetchBlogById = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/blog/${id}`);
                if (!res) {
                    console.log("Blog not found by ID");
                }
                setBlogs(res.data.blog);
                setComments(res.data.comments);
                setisUserIsAuthor(res.data.isAuthor);
                setLoading(false);
            } catch (error) {
                console.error(error || "Blog not found by ID");
            }
        };
        fetchBlogById();
    }, [id]);

    const handleDeleteBlog = async (blogid) => {
        try {
            await axios.delete(`/blog/${blogid}`);
            navigate("/");
        } catch (error) {
            console.error("Error deleting blog:", error.response?.data?.message || error.message);
            alert("Failed to delete blog.");
        }
    };

    const addNewCommentToState = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    const handleSaveBlog = async (blogId, userId) => {
        try {
            if (!blogId || !userId) {
                console.log("Blog ID and User ID are required");
                return;
            }

            if (isSaved) {
                console.log("Blog is already saved!");
                return;
            }

            const response = await axios.post(
                `/blog/saveBlog/${blogId}`,
                { userId },
                { headers: { "Content-Type": "application/json" } }
            );

            if (!response.data || !response.data.data) {
                console.log("Blog is not saved due to an error!");
                return;
            }

            const newSavedBlog = response.data.data;
            console.log(newSave)

            setSavedBlogsByUser((prevBlogs) => [...prevBlogs, newSavedBlog]);
        } catch (error) {
            console.error("Error occurred while saving the blog:", error.response?.data || error.message);
        }
    };

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
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

                    {/* Interaction Buttons ✅ Using the new component */}
                    <BlogInteractions
                        blogId={id}
                        userId={userId}
                        isSaved={isSaved}
                        setIsSaved={setIsSaved}
                        setIsShareOpen={setIsShareOpen}
                        isUserIsAuthor={isUserIsAuthor}
                        handleSaveBlog={handleSaveBlog}
                        handleDeleteBlog={handleDeleteBlog}
                    />

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
                        <BlogBody content={blog?.body} />
                    </div>

                    {/* Comment Section */}
                    <AddNewComment blogId={id} addNewCommentToState={addNewCommentToState} />
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Comments <span className="text-xl text-gray-600">({comments.length})</span>
                        </h2>
                        {comments.length > 0 ? (
                            comments.map((comment) => <CommentCard key={comment._id} comment={comment} />)
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>

                    <BlogInteractions
                        blogId={id}
                        userId={userId}
                        isSaved={isSaved}
                        setIsSaved={setIsSaved}
                        setIsShareOpen={setIsShareOpen}
                        isUserIsAuthor={isUserIsAuthor}
                        handleSaveBlog={handleSaveBlog}
                        handleDeleteBlog={handleDeleteBlog}
                    />

                    <div className="py-2">
                        <BlogAuthorInfo
                            profileImageURL={blog?.createdBy?.profileImageURL}
                            fullName={blog?.createdBy?.fullName}
                            about={"Aspiring Software Engineer"}
                            createdAt={blog?.createdAt}
                        />
                    </div>


                    {isShareOpen && <SharePage blogUrl={`https://bloghive-lac.vercel.app/blog/${id}`} onClose={() => setIsShareOpen(false)} />}
                </div>
            )}
        </>
    );
};

export default BlogDetails;

