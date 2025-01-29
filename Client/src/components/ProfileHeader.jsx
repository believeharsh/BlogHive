import { useState } from "react";
import React from "react";
const ProfileHeader = ({ username }) => {
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
    <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
      {/* Left Side - Username */}
      <h2 className="text-xl font-semibold text-gray-800">{username}</h2>

      {/* Right Side - Dropdown */}
      <div className="relative">
        {/* Three-dot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <span className="w-1 h-1 bg-gray-800 rounded-full block mb-1"></span>
          <span className="w-1 h-1 bg-gray-800 rounded-full block mb-1"></span>
          <span className="w-1 h-1 bg-gray-800 rounded-full block"></span>
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
  );
};

export default ProfileHeader;
