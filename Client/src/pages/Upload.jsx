/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const Upload = () => {
  const navigate = useNavigate();
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

    console.log("Form data:", formData); // Check form data

    try {
      const response = await axios.post("/blog", formData);
      console.log("Response:", response);

      // Redirecting after successful submission
      navigate("/");

      // Reset form fields
      setTitle("");
      setBody("");
      setCoverImage(null);
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Failed to upload blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Write Your New Blog</h2>
        {/* Publish button outside the form */}
        <button
          onClick={handleSubmit} // Manually trigger handleSubmit on button click
          className="px-6 py-2 text-white font-medium rounded-full bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          Publish
        </button>
      </div>

      {/* Form Fields */}
      <form className="w-full max-w-3xl space-y-6">
        {/* Blog Title */}
        <div>
          <label htmlFor="title" className="block text-4xl font-thin text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-3 text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 outline-none transition duration-300 focus:border-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label htmlFor="coverImage" className="block text-lg font-thin text-gray-700 mb-2">
            Cover Image
          </label>
          <div className="flex items-center gap-4 border-b-2 border-gray-300 py-3">
            <input
              type="file"
              id="coverImage"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <label
              htmlFor="coverImage"
              className="cursor-pointer px-4 py-2 text-white font-medium bg-green-600 rounded-full hover:bg-green-700 transition duration-300"
            >
              Choose File
            </label>
            <span className="text-gray-500">{coverImage?.name || "No file selected"}</span>
          </div>
        </div>

        {/* Blog Content */}
        <div>
          <label htmlFor="body" className="block text-lg font-thin text-gray-700 mb-2">
            Tell your Story ...
          </label>
          <textarea
            id="body"
            rows="8"
            className="w-full px-4 py-3 text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 outline-none transition duration-300 focus:border-green-500"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Upload;

