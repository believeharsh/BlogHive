/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.get("/user/profile")
        const profiledata = userData.data.data ; 
        console.log(userData.data.data) 
        setUserData(profiledata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []) ; 

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex items-center space-x-4">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            src={userData.ProfileImageURL || "https://via.placeholder.com/150"}
            alt={`${userData.fullName}'s Avatar`}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{userData.fullName}</h1>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">About</h2>
          <p className="text-gray-700 mt-2">{userData.bio || "No bio available."}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Details</h2>
          <ul className="text-gray-700 mt-2 space-y-1">
            <li>
              <strong>Location:</strong> {userData.location || "Not specified"}
            </li>
            <li>
              <strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString() || "Unknown"}
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;
