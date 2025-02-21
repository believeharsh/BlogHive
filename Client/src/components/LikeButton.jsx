import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { PiHandsClappingLight, PiHandsClappingBold } from "react-icons/pi";

const LikeButton = ({ blogId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // Fetching initial like status
        axiosInstance.get(`/like/is-already-liked/${blogId}`).then((res) => {
            setLiked(res.data.isLiked);
        });

        // Fetching total like count
        axiosInstance.get(`/like/get-total-likes/${blogId}`).then((res) => {
            setLikeCount(res.data.likeCount);
        });
    }, [blogId]);

    const handleLike = async () => {
        try {
            if (liked) {
                await axiosInstance.delete("/like/Unlike-a-blog", { data: { blogId } });
                setLikeCount((prev) => prev - 1);
            } else {
                await axiosInstance.post("/like/like-a-blog", { blogId });
                setLikeCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Error liking/unliking blog", error);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={handleLike} className="w-6 h-6 cursor-pointer">
                {liked
                    ?
                    <PiHandsClappingBold className="text-black font-bold w-6 h-6" />
                    :
                    <PiHandsClappingLight className="text-gray-700 w-6 h-6" />
                }
            </button>
            <span className="text-sm font-medium text-gray-700">{likeCount}</span>
        </div>
    );
};

export default LikeButton;
