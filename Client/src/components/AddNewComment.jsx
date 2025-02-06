import React from "react";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;



const AddNewComment = ({ blogId , addNewCommentToState }) => {
    const [loading, setLoading] = useState(false) ; 
    const [comment, setComment] = useState("");

    const postNewComment = async (blogId) => {
        setLoading(true) ; 
        try {
            const response = await axios.post(`/comment/${blogId}`, {
                content: comment, 
            })
            
            const newComment = response.data.data.newComment ; 

            setComment("");
            addNewCommentToState(newComment)
            setLoading(false)

        } catch (error) {
            console.log("error occured while posting this comment", error)
        }

    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    onClick={() => postNewComment(blogId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Post
                </button>
            </div>
        </>
    )
}

export default AddNewComment; 