import React from "react";
import FollowButton from "../components/FollowButton"

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
            <button className="px-2 py-1 bg-black font-semibold rounded-full text-xl cursor-pointer" >
              <FollowButton buttonColor={"text-white"}/>
          </button>
        </div>
    );
};

export default BlogAuthorInfo;
