import React, { useState } from "react";
import { MdComment } from "react-icons/md";
import { BsBookmark, BsBookmarkFill, BsHeart } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import formatDate from "../utils/FormateData";

const BlogCard = ({ authorName, title, body, coverImage, createdAt, profileImageURL }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col md:flex-row items-start gap-4">

        {/* Left Section: Text Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={profileImageURL}
              alt={authorName}
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-sm text-gray-700 font-medium">{authorName}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {title}
          </h3>

          {/* Body (Shortened for compactness) */}
          <div className="text-xm text-gray-600 line-clamp-1">
            <p dangerouslySetInnerHTML={{ __html: typeof body === "string" ? body : JSON.stringify(body) }}></p>

          </div>

          {/* Footer: Comment, Save & Options */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <p className="text-sm font-light text-gray-700">{formatDate(createdAt)}</p>
              <MdComment className="text-lg cursor-pointer hover:text-gray-900 transition-all duration-300" />
              <BsHeart className="text-lg cursor-pointer hover:text-gray-900 transition-all duration-300"/>

            </div>

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






