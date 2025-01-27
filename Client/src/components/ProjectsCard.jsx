import React from "react";

const ProjectCard = ({ title, body, coverImageURL, createdAt }) => {
  console.log(coverImageURL) ;
  const CoverImageBaseUrl = "import.meta.env.VITE_API_BASE_URL" ; 
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* Cover Image */}
      <img
        src={`${CoverImageBaseUrl}${coverImageURL}`}
        alt={title}
        className="w-full h-48 object-cover"
      />
      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{body.substring(0, 100)}...</p>
        <p className="text-gray-500 text-xs">
          Posted on: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
