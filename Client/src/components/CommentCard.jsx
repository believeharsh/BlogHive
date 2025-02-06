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
        <div className="flex gap-4 p-4 border-b border-gray-200">
            {/* First Section: User Image, Username, Date */}
            <div className="flex-shrink-0">
                <img
                    src={comment.createdBy.profileImageURL || "/default-avatar.png"}
                    alt={comment.createdBy.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>

            <div className="flex flex-col flex-1">
                {/* Username and Date */}
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg  text-gray-800">{comment.createdBy.fullName}</h3>
                    <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                {/* Second Section: Comment Content */}
                <p className="text-gray-700 mt-1">{comment.content}</p>

                {/* Third Section: Like & Dislike Buttons */}
                <div className="flex gap-4 mt-2 text-gray-600">
                    <button className="flex items-center gap-1 hover:text-blue-500">
                        <FaThumbsUp /> <span>{comment.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-500">
                        <FaThumbsDown /> <span>{comment.dislikes || 0}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard
