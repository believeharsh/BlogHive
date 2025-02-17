import React, { useState } from "react";
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegShareSquare, FaBookmark } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ConfirmDelete from "./ConfirmDelete";
import BlogMoreActions from "./BlogMoreActions";

const BlogInteractions = ({ blogId, userId, isSaved, setIsSaved, setIsShareOpen, isUserIsAuthor, handleSaveBlog, handleDeleteBlog, handleRemoveSavedBlog }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    
    const handleDeleteConfirmation = () => {
        handleDeleteBlog(blogId);
        setIsDeleteConfirmationOpen(false);
    };

    return (
        <div className="flex items-center justify-between py-4">
            {/* Left: Like & Comment */}
            <div className="flex items-center gap-6">

                <button className=" cursor-pointer flex items-center gap-1 text-gray-500 hover:text-gray-800 transition">
                    <FaRegHeart className="w-5 h-5" />
                    <span>Like</span>
                </button>

                <button className=" cursor-pointer  flex items-center gap-1 text-gray-500 hover:text-gray-800 transition">
                    <FaRegComment className="w-5 h-5" />
                    <span>Comment</span>
                </button>

            </div>

            {/* Right: Save, Share, More Options */}
            <div className=" relative flex items-center gap-6">
                <button className=" cursor-pointer  text-gray-500 hover:text-gray-800 transition" onClick={() => isSaved ? handleRemoveSavedBlog(blogId, userId) : handleSaveBlog(blogId, userId)}>
                    {isSaved ? <FaBookmark className="w-5 h-5 text-gray-900" /> : <FaRegBookmark className="w-5 
                    
                    h-5" />
                    }
                </button>

                <button className="cursor-pointer  text-gray-500 hover:text-gray-800 transition" onClick={() => setIsShareOpen(true)}>
                    <FaRegShareSquare className="w-5 h-5" />
                </button>

                <button className="cursor-pointer  text-gray-500 hover:text-gray-800 transition" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <HiOutlineDotsHorizontal className="w-5 h-5" />
                </button>

                {isDropdownOpen && (
                    <BlogMoreActions
                        isUserIsAuthor={isUserIsAuthor}
                        setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                    />
                )}

            </div>

            {/* Conditional Rendering of the ConfirmDelete Component */}
            {isDeleteConfirmationOpen && (
                <ConfirmDelete
                    message="Are you sure you want to delete this blog?"
                    onCancel={() => setIsDeleteConfirmationOpen(false)}
                    onConfirm={handleDeleteConfirmation}
                />
            )}
        </div>
    );
};

export default BlogInteractions;









