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
import axiosInstance from "../utils/axiosInstance";
import { useUserProfileData } from "../context/userContext";
import FollowButton from "../components/FollowButton";


const BlogDetails = () => {
    const [currentBlog, setCurrentBlog] = useState(null);
    const { savedBlogsByUser, userId, setSavedBlogsByUser } = useBlogs();
    const [comments, setComments] = useState([]);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUserIsAuthor, setisUserIsAuthor] = useState(false);
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();
    const blogHiveUser = localStorage.getItem("BlogHiveUser");
    const { blogs, setBlogs } = useUserProfileData();

    useEffect(() => {
        // Checking if the blog is already saved or not?
        if (savedBlogsByUser.length !== 0) {
            setIsSaved(savedBlogsByUser.some(blog => blog.savedBlogId._id === id));
        }
    }, [savedBlogsByUser, id]);

    useEffect(() => {
        const fetchBlogById = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/blog/${id}`);
                if (!res) {
                    console.log("Blog not found by ID");
                }
                setCurrentBlog(res.data.blog);
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
            await axiosInstance.delete(`/blog/${blogid}`);
            setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogid));
            setSavedBlogsByUser((prevBlogs) => prevBlogs.filter(blog => blog.savedBlogId._id !== blogid));
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

            const response = await axiosInstance.post(
                `/blog/saveBlog/${blogId}`,
                { userId },
                { headers: { "Content-Type": "application/json" } }
            );

            if (!response.data || !response.data.data) {
                console.log("Blog is not saved due to an error!");
                return;
            }

            const newSavedBlog = response.data.data;

            setSavedBlogsByUser((prevBlogs) => [...prevBlogs, newSavedBlog]);
        } catch (error) {
            console.error("Error occurred while saving the blog:", error.response?.data || error.message);
        }
    };

    const handleRemoveSavedBlog = async (blogId, userId) => {
        try {
            if (!blogId || !userId) {
                console.log("Blog ID and User ID are required");
                return;
            }

            if (isSaved) {
                const response = await axiosInstance.delete(
                    `/blog/remove-saved-blog/${blogId}`,
                    { headers: { "Content-Type": "application/json" }, data: { userId } }
                );


                if (response.status === 200) {
                    console.log("blog is removed succussfully")
                }

                setSavedBlogsByUser((prevBlogs) => prevBlogs.filter(blog => blog.savedBlogId._id !== blogId));
                setIsSaved(false);
            }


        } catch (error) {
            console.error("Error occurred while saving the blog:", error.response?.data || error.message);
        }
    }

    return (
        <>
            {loading && <Spinner />}

            {!loading && (
                <div className="max-w-3xl mx-auto px-4 py-6">
                    {/* Blog Title */}
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{currentBlog?.title}</h1>

                    {/* User Profile Section */}
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={currentBlog?.createdBy?.profileImageURL}
                            alt={currentBlog?.createdBy?.username}
                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{currentBlog?.createdBy?.fullName}
                                <span>
                                    <FollowButton className="text-xl font-medium"
                                        authorId={currentBlog?.createdBy?._id}
                                        buttonColor={"text-blue-700"}
                                    />
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(currentBlog?.createdAt)}</p>
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
                        handleRemoveSavedBlog={handleRemoveSavedBlog}
                    />

                    {/* Cover Image */}
                    <div className="mb-6 mt-4">
                        <img
                            src={currentBlog?.coverImage || "/images/LibraryCover_Images(2).jpg"}
                            alt="Blog cover"
                            className="w-full h-80 object-cover rounded-md"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg text-gray-700 py-2">
                        <BlogBody content={currentBlog?.body} />
                    </div>

                    {/* Comment Section */}
                    <AddNewComment blogId={id} addNewCommentToState={addNewCommentToState} />
                    <div className="bg-white  rounded-lg p-4 my-2">
                        <h2 className="text-xl font-semibold mb-4">
                            Responses <span className="text-xl text-gray-600">({comments.length})</span>
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
                            profileImageURL={currentBlog?.createdBy?.profileImageURL}
                            fullName={currentBlog?.createdBy?.fullName}
                            about={"Aspiring Software Engineer"}
                            createdAt={currentBlog?.createdAt}
                        />
                    </div>


                    {isShareOpen && <SharePage blogUrl={`https://bloghive-lac.vercel.app/blog/${id}`} onClose={() => setIsShareOpen(false)} />}
                </div>
            )}
        </>
    );
};

export default BlogDetails;

