import React from "react";

const BlogAuthorInfo = ({ profileImageURL, fullName, about, createdAt }) => {


    return (
        <div className="flex justify-between items-center border-t mt-6 pt-4">
            {/* Left: User Image */}
            <div className="flex items-center gap-4 cursor-pointer"
            >
                <img
                    src={profileImageURL}
                    alt={fullName}
                    className="w-16 h-16 rounded-full object-cover"
                />
            </div>

            {/* Center: User Info */}
            <div className="flex-1 px-3">
                <p className="text-2xl font-semibold text-gray-900">{`Written By ${fullName}`}</p>
                <p className="text-sm text-gray-600">{about || "No bio available"}</p>
                <p className="text-sm text-gray-500">Member since {new Date(createdAt).toLocaleDateString()}</p>
            </div>

            {/* Right: Follow Button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer">
                Follow
            </button>
        </div>
    );
};

export default BlogAuthorInfo;
