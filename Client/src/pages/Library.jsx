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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Library</h1>
          <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New List
          </button>
        </div>
        {/* Navigation Bar */}
        <div className="flex justify-center space-x-6 mb-6 border-b border-gray-200 pb-4">
          {["yourList", "savedList", "highlights", "readingHistory"].map(
            (tab) => (
              <button
                key={tab}
                className={`text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace(/([A-Z])/g, " $1")}
              </button>
            )
          )}
        </div>
        {/* List Rendering */}
        <div className="space-y-4">
          {currentList.length > 0 ? (
            currentList.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt="List Item"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
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