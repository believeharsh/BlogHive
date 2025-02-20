import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const FollowButton = ({ authorId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
 
    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                // console.log("Sending Follow request to:", `/follow/isAlreadyFollowing/${authorId}`);

                const res = await axiosInstance.get(`/follow/isAlreadyFollowing/${authorId}`);
                console.log("Response:", res);

                if (res.data) {
                    setIsFollowing(res.data.isFollowing);
                }
            } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        };
        if (authorId) {
            checkFollowStatus();
        }
        
    }, [authorId]);  // Dependency added

    const handleFollow = async () => {
        try {
            await axiosInstance.post(`/follow/follow-an-author/${authorId}`);
            setIsFollowing(true);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axiosInstance.delete(`/follow/unfollow-an-author/${authorId}`); // ✅ Fixed URL
            setIsFollowing(false);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <button
            onClick={authorId ? (isFollowing ? handleUnfollow : handleFollow) : null}
            className="px-4 py-2 text-blue-800 hover:text-blue-600 cursor-pointer"
            disabled={!authorId}  // Disable button if authorId is undefined
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
