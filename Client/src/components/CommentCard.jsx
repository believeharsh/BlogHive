import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const CommentCard = ({ comment }) => {
    return (
        <div className="flex items-start gap-3 p-3 border-b border-gray-200">
            {/* Profile Image */}
            <img
                src={comment.createdBy.profileImageURL || "/default-avatar.png"}
                alt={comment.createdBy.fullName}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />

            {/* Comment Content */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    {/* Username & Date */}
                    <span className="text-sm font-medium text-gray-900">{comment.createdBy.fullName}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>

                {/* Like & Dislike Buttons */}
                <div className="flex gap-4 mt-1 text-gray-500 text-xs">
                    <button className="flex items-center gap-1 hover:text-blue-500 transition">
                        <FaThumbsUp className="w-3.5 h-3.5" /> 
                        <span>{comment.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-500 transition">
                        <FaThumbsDown className="w-3.5 h-3.5" /> 
                        <span>{comment.dislikes || 0}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
