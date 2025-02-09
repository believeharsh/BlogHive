import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { FiLoader } from "react-icons/fi"; 

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const AddNewComment = ({ blogId, addNewCommentToState }) => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");

    const postNewComment = async () => {
        if (!comment.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(`/comment/${blogId}`, {
                content: comment,
            });

            const newComment = response.data.data.newComment;
            setComment("");
            addNewCommentToState(newComment);
        } catch (error) {
            console.error("Error while posting comment:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center gap-3 bg-white border border-gray-300 shadow-sm rounded-full p-2 px-4 transition focus-within:shadow-md m-1">
            {/* Input Field */}
            <input
                type="text"
                className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
            />

            {/* Post Button */}
            <button
                onClick={postNewComment}
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
            >
                {loading ? (
                    <FiLoader className="animate-spin w-5 h-5" />
                ) : (
                    <FaPaperPlane className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default AddNewComment;
