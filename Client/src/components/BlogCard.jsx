import React, { useState } from "react";
import { MdComment } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const BlogCard = ({ authorName, title, body, coverImage, createdAt, profileImageURL }) => {
  const [saved, setSaved] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col md:flex-row items-start gap-4">
        
        {/* Left Section: Text Content */}
        <div className="flex-1 space-y-2">
          {/* Author Section (Now smaller & inline) */}
          <div className="flex items-center gap-2">
            <img
              src={profileImageURL}
              alt={authorName}
              className="w-7 h-7 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-xs text-gray-700 font-medium">{authorName} • {formatDate(createdAt)}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {title}
          </h3>

          {/* Body (Shortened for compactness) */}
          <p className="text-xm text-gray-600 line-clamp-1">
            {body}
          </p>

          {/* Footer: Comment, Save & Options */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <MdComment className="text-lg cursor-pointer hover:text-gray-900 transition-all duration-300" />
            
            <div className="flex items-center gap-4">
              <button onClick={() => setSaved(!saved)} className="hover:text-gray-900 transition-all duration-300">
                {saved ? <BsBookmarkFill className="text-blue-500 text-lg" /> : <BsBookmark className="text-lg" />}
              </button>
              <button className="hover:text-gray-900 transition-all duration-300">
                <BiDotsVerticalRounded className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Blog Image (Slightly Smaller) */}
        <div className="w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
          <img
            src={coverImage}
            alt="Blog"
            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          />
        </div>

      </div>
    </div>
  );
};

export default BlogCard;






