import React from "react";

const BlogMoreActions = ({ isUserIsAuthor, setIsDeleteConfirmationOpen, setIsDropdownOpen }) => {
    const authorActions = [
        { name: "Edit Story", style: "text-gray-700 hover:bg-gray-100" },
        { name: "Story Settings", style: "text-gray-700 hover:bg-gray-100" },
        { name: "Story Stats", style: "text-gray-700 hover:bg-gray-100" },
        { name: "Hide Responses", style: "text-gray-700 hover:bg-gray-100" },
        { 
            name: "Delete Story", 
            style: "text-red-600 hover:bg-red-100", 
            onClick: () => {
                setIsDeleteConfirmationOpen(true);
                setIsDropdownOpen(false);
            }
        },
    ];

    const readerActions = [
        { name: "Follow Author", style: "text-gray-700 hover:bg-gray-100" },
        { name: "Follow Publication", style: "text-gray-700 hover:bg-gray-100" },
    ];

    return (
        <div className="absolute right-8 mt-2 w-48 bg-white shadow-sm rounded-lg p-2 transition-opacity duration-200">
            {(isUserIsAuthor ? authorActions : readerActions).map((action, index) => (
                <button
                    key={index}
                    className={`cursor-pointer block w-full text-left px-4 py-2 ${action.style}`}
                    onClick={() => {
                        setIsDropdownOpen(false); // Closing the  dropdown after any action
                    }}
                >
                    {action.name}
                </button>
            ))}
        </div>
    );
};

export default BlogMoreActions;
