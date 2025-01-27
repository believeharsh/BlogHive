import React, { useState } from "react";

const Notification = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "response",
      userImage: "https://via.placeholder.com/40",
      username: "John Doe",
      content: "John responded to your comment.",
    },
    {
      id: 2,
      type: "all",
      userImage: "https://via.placeholder.com/40",
      username: "Jane Smith",
      content: "Jane liked your post.",
    },
    {
      id: 3,
      type: "response",
      userImage: "https://via.placeholder.com/40",
      username: "Mark Wilson",
      content: "Mark replied to your message.",
    },
  ];

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Notifications
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium ${filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-sm font-medium ${filter === "response"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setFilter("response")}
          >
            Responses
          </button>
        </div>
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <img
                  src={notification.userImage}
                  alt={notification.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No notifications available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
