import React, { useState } from "react";
import { MdComment } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const BlogCard = ({ title, body, coverImage, createdAt }) => {
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
    <div className="border-b border-gray-300 py-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

        {/* Left Section: Text Content */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

          {/* Body Content with Fixed Height */}
          <p className="text-sm text-gray-600 min-h-[48px] line-clamp-2">
            {body}
          </p>

          {/* Footer: Date, Comment, Save, and Options */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">

            {/* Left: Date and Comment */}
            <div className="flex items-center gap-4">
              <span>{formatDate(createdAt)}</span>
              <MdComment className="cursor-pointer hover:text-gray-800" />
            </div>

            {/* Right: Save & Three Dots */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSaved(!saved)} className="text-gray-600 hover:text-gray-900">
                {saved ? <BsBookmarkFill className="text-blue-500" /> : <BsBookmark />}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <BiDotsVerticalRounded />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Blog Image */}
        <div className="w-44 h-28 md:w-52 md:h-32 flex-shrink-0">
          <img
            src={coverImage}
            alt="Blog"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

      </div>
    </div>
  );
};

export default BlogCard;

