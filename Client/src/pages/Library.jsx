import React, { useState } from "react";

const Library = () => {
  const [activeTab, setActiveTab] = useState("yourList");

  const listData = {
    yourList: [
      {
        id: 1,
        image: "https://via.placeholder.com/150",
        creator: "Alice Johnson",
        createdAt: "Jan 20, 2025",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/150",
        creator: "Bob Smith",
        createdAt: "Jan 18, 2025",
      },
    ],
    savedList: [
      {
        id: 3,
        image: "https://via.placeholder.com/150",
        creator: "Charlie Davis",
        createdAt: "Jan 15, 2025",
      },
    ],
    highlights: [
      {
        id: 4,
        image: "https://via.placeholder.com/150",
        creator: "Diana Lewis",
        createdAt: "Jan 10, 2025",
      },
    ],
    readingHistory: [
      {
        id: 5,
        image: "https://via.placeholder.com/150",
        creator: "Evan Walker",
        createdAt: "Jan 5, 2025",
      },
    ],
  };

  const currentList = listData[activeTab] || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Your Library</h1>
          <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300">
            New List
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex justify-center space-x-8 mb-6 border-b border-gray-300 pb-4">
          {["yourList", "savedList", "highlights", "readingHistory"].map(
            (tab) => (
              <button
                key={tab}
                className={`text-lg font-medium ${
                  activeTab === tab
                    ? "text-green-600 border-b-4 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                } transition duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace(/([A-Z])/g, " $1")}
              </button>
            )
          )}
        </div>

        {/* List Rendering */}
        <div className="space-y-6">
          {currentList.length > 0 ? (
            currentList.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt="List Item"
                  className="w-24 h-24 rounded-lg object-cover shadow-sm"
                />
                <div className="ml-6">
                  <p className="text-lg font-medium text-gray-900">
                    Created by: {item.creator}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created on: {item.createdAt}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No items in this list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
