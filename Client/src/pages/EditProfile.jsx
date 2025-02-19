import React, { useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { RxCross1 } from "react-icons/rx";
import { useUserProfileData } from "../context/userContext";


const EditProfilePage = ({ initialAboutText, onCancle }) => {
    const [aboutText, setAboutText] = useState(initialAboutText || "");
    const {userProfileData} = useUserProfileData() ; 
    const editUserProfile = async () => {
        if (!aboutText) {
            console.log("About field cannot be empty");
            return;
        }

        try {
            const res = await axiosInstance.post(
                "/user/edit-user-profile",
                { aboutText },
                { headers: { "Content-Type": "application/json" } }
            );

            userProfileData.about = aboutText ; 
            onCancle();
        } catch (error) {
            console.error("Error occurred while updating the profile", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50  transition-opacity duration-300 ease-in-out opacity-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] max-w-lg relative  opacity-100 scale-95 transition-transform duration-300 ease-in-out">
                <button className="absolute top-4 right-4" onClick={onCancle}>
                    <RxCross1 className="text-gray-700 hover:text-gray-900 cursor-pointer " />
                </button>
                <div className="flex justify-center items-center flex-col">
                    <h2 className="text-xl font-semibold mb-5">Profile Information</h2>
                    <div className="flex items-center gap-4 w-full">
                        <img
                            src="/images/boy_avatar.jpeg"
                            alt="Profile"
                            className="w-21 h-21 rounded-full object-cover cursor-pointer"
                        />
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <button className="text-green-600 text-sm font-medium cursor-pointer">Update</button>
                                <button className="text-red-600 text-sm font-medium ml-4 cursor-pointer">Remove</button>
                            </div>

                            <div className="text-sm font-semibold">
                                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                            </div>

                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block mt-4 text-lg font-medium">Name*</label>
                        <input
                            type="text"
                            value="Harsh Dahiya"
                            disabled
                            className="w-full p-2 mt-1 border rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                        />
                    </div>

                    {/* Pronouns Input */}
                    <div className="w-full">
                        <label className="block mt-4 text-lg font-medium">Pronouns</label>
                        <input
                            type="text"
                            disabled
                            placeholder="Add..."
                            className="w-full p-2 mt-1 border rounded bg-gray-100 focus:bg-white"
                        />
                    </div>



                    <div className="w-full">
                        <label className="block mt-4 text-lg font-medium">Short bio</label>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded bg-gray-100 focus:bg-white h-[72px] text-lg resize-none focus:outline-1"
                            value={aboutText}
                            onChange={(e) => setAboutText(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-7 w-full">
                        <button
                            className="px-4 py-2 border border-green-700 rounded-2xl text-green-700 cursor-pointer"
                            onClick={onCancle}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded-2xl font-bold text-white bg-green-700 hover:bg-green-800 cursor-pointer"
                            onClick={editUserProfile}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
