/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);

    try {
      const response = await axios.post("/blog", formData)
      console.log(response) ; 

      // Reset fields
      setTitle("");
      setBody("");
      setCoverImage("");
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Failed to upload blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Upload New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Body
            </label>
            <textarea
              id="body"
              rows="6"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
