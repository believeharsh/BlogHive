import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNav from "../components/ProfileNav";
import EditProfilePage from "./EditProfile";
import { useUserProfileData } from "../context/userContext";
import { useBlogs } from "../context/BlogContext";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProfilePageContent from "../components/ProfilePageContent";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Your Blogs");
  const [isEditing, setIsEditing] = useState(false);
  const { userProfileData, loading, blogs = [] } = useUserProfileData();
  const { savedBlogsByUser = [] } = useBlogs();
  const { fullName, about } = userProfileData;
  const IsUserHasProfileImage = userProfileData.profileImageURL === "/public/Images/defaultImage.png";

  const Following = [
    { id: 1, name: "John Doe", username: "johndoe", profile: "/images/boy_avatar.jpeg" },
    { id: 2, name: "Jane Smith", username: "janesmith", profile: "/images/boy2_avatar.jpeg" },
    { id: 3, name: "David Lee", username: "davidlee", profile: "/images/default_Image.jpeg" }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen py-6 container mx-auto px-4 gap-8">
      <div className="w-full md:w-2/3 00 px-4 h-auto md:h-screen overflow-y-auto no-scrollbar">
        <ProfileHeader userProfileData={userProfileData} />
        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-white  rounded-lg ">
          <ProfilePageContent activeTab={activeTab} blogs={blogs} savedBlogsByUser={savedBlogsByUser} loading={loading} />
        </div>
      </div>

      <div className="w-full md:w-1/3 space-y-6 py-6 md:h-screen md:sticky md:top-0 overflow-y-auto no-scrollbar md:border-l md:border-gray-300">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <img
            src={IsUserHasProfileImage ? "/images/default_Image.jpeg" : userProfileData.profileImageURL}
            alt=""
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-300"
          />
          <p className="font-semibold text-lg mt-3">{fullName}</p>
          <p className="text-gray-500 text-sm">100k Followers</p>
          <p className="text-sm text-gray-600 mt-1 px-2">{about}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-green-600 hover:underline text-sm mt-2"
          >
            Edit profile
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">

          <h2 className="text-lg font-semibold mb-4">Following</h2>

          <div className="space-y-4">
            {Following.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <Link className="flex items-center gap-3">
                  <img src={user.profile} alt="" className="h-10 w-10 rounded-full" />
                  <p className="text-sm font-medium">{user.name}</p>
                </Link>
                <button className="text-gray-500 hover:text-black cursor-pointer">
                  <BiDotsVerticalRounded />
                </button>
              </div>
            ))}
          </div>

          <button
            className="cursor-pointer text-green-600 text-sm mt-4 hover:underline"
          >See all
            ({Following.length})
          </button>

        </div>
      </div>
      {isEditing && <EditProfilePage about={about} onCancle={() => setIsEditing(false)} />}
    </div>
  );
};

export default ProfilePage;
