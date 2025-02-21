import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const FollowButton = ({ authorId, buttonColor }) => {
    const [isFollowing, setIsFollowing] = useState(false);
 
    useEffect(() => {
        const checkFollowStatus = async () => {
            try {

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
            await axiosInstance.delete(`/follow/unfollow-an-author/${authorId}`); 
            setIsFollowing(false);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <button
            onClick={authorId ? (isFollowing ? handleUnfollow : handleFollow) : null}
            className={`px-4 py-2 cursor-pointer ${buttonColor}`}
            disabled={!authorId}  // Disable button if authorId is undefined
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
