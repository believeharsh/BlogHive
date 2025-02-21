import React from "react";
import { FaRegComment } from "react-icons/fa";
import formatDate from "../utils/FormateData";
import { PiHandsClappingLight } from "react-icons/pi";

const CommentCard = ({ comment }) => {
    console.log(comment)
    return (
        <div className="flex items-start gap-3 p-3 border-b border-gray-200">
            {/* Profile Image */}
            <img
                src={comment?.createdBy?.profileImageURL || "/images/deault_Image.jpeg"}
                alt={comment?.createdBy?.fullName || "No Name"}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />

            {/* Comment Content */}
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    {/* Username & Date */}
                    <span className="text-sm font-medium text-gray-900">{comment?.createdBy?.fullName || "No Name"}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment?.createdAt) || "No Date"}</span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-700 mt-1">{comment?.content || "No content available"}</p>

                {/* Like & Dislike Buttons */}
                <div className="flex gap-4 mt-1 text-gray-500 text-sm ml-2">
                    <button className="flex items-center gap-1 hover:text-gray-900 transition cursor-pointer">
                        <PiHandsClappingLight className="w-4 h-4" />
                        <span>{comment.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-900 transition cursor-pointer">
                        <FaRegComment className="w-3 h-3" />
                        <span>{comment.dislikes || 0}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
