import React, { useState } from "react";
import { FaBell, FaCommentAlt, FaThumbsUp } from "react-icons/fa";

const Notification = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "response",
      userImage: "/images/boy_avatar.jpeg",
      username: "Rohit Rana",
      content: "Rohit responded to your comment.",
    },
    {
      id: 2,
      type: "all",
      userImage: "/images/girl_avatar.jpg",
      username: "Saifali Thakur",
      content: "Saifali liked your post.",
    },
    {
      id: 3,
      type: "response",
      userImage: "/images/boy2_avatar.jpeg",
      username: "kartik Roy",
      content: "Kartik replied to your message.",
    },
  ];

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-gray-100 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Notifications
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            className={`flex items-center space-x-2 py-3 px-6 rounded-lg text-sm font-medium ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition-all duration-300`}
            onClick={() => setFilter("all")}
          >
            <FaBell />
            <span>All</span>
          </button>
          <button
            className={`flex items-center space-x-2 py-3 px-6 rounded-lg text-sm font-medium ${
              filter === "response" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition-all duration-300`}
            onClick={() => setFilter("response")}
          >
            <FaCommentAlt />
            <span>Responses</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={notification.userImage}
                  alt={notification.username}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div className="ml-6">
                  <p className="text-lg font-semibold text-gray-900">
                    {notification.username}
                  </p>
                  <p className="text-sm text-gray-600">{notification.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
