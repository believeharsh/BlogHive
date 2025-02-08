import React from "react";
const ProfileNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-[rgba(255,255,255,1)]">
    <div className="container mx-auto border-b border-gray-300 bg-white">
      <nav className="flex justify-start space-x-6 p-4">
        {["Blogs", "SavedBlogs", "List", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`text-gray-800 text-lg font-medium relative pb-2 transition-all ${
              activeTab === tab ? "border-b-2 border-black" : "hover:border-b-2 hover:border-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
    </div>

  );
};

export default ProfileNav;