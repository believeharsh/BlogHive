import { useState } from "react";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import formatDate from "../utils/FormateData";

const ProfileHeader = ({ userProfileData }) => {
  const { username, fullName, profileImageURL, createdAt } = userProfileData;
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const profileLink = `${window.location.origin}/profile/${username}`;
    navigator.clipboard.writeText(profileLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    setIsOpen(false);
  };

  return (
    <div className="bg-[rgba(255,255,255,1)] p-4">
      <div className="container mx-auto flex items-center justify-between p-4  bg-white">
        {/* Left Side - Username */}
        <div className="flex gap-2">
          {/* <img src={profileImageURL} alt="" className="w-32 h-32 rounded-full" /> */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold text-gray-800">{fullName}</h1>
            <p className="text-sm font-semibold text-gray-800">{`Since ${formatDate(createdAt)}`}</p>
          </div>


        </div>


        {/* Right Side - Dropdown */}
        <div className="relative">
          {/* Three-dot Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-200 text-xl"
          >
            <BiDotsVerticalRounded />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={handleCopyLink}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {copied ? "Copied!" : "Copy link to profile"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ProfileHeader;

