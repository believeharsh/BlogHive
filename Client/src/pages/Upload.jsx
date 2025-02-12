import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useUserProfileData } from "../context/userContext";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { setBlogs } = useUserProfileData();

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body); 
    formData.append("coverImage", coverImage);

    try {
      const res = await axios.post("/blog", formData);
      navigate("/");
      setTitle("");
      setBody("");
      setCoverImage(null);

      if (!res) {
        console.log("any error has occured while uploading new blog")
      }

      const newToBeSavedBlog = res.data.data.newBlog
      setBlogs((prevBlogs) => [...prevBlogs, newToBeSavedBlog]);

    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Failed to upload blog. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 transition ${isPublishing ? "pointer-events-none" : ""
        }`}
    >
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          ✍️ Write Your Blog
        </h2>

        {/* Publish Button with Loader */}
        <button
          onClick={handleSubmit}
          disabled={isPublishing}
          className={`px-6 py-2 text-white font-medium rounded-full bg-green-600 hover:bg-green-700 transition duration-300 flex items-center gap-2 ${isPublishing ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isPublishing ? <ImSpinner8 className="animate-spin text-xl" /> : <FiUploadCloud />}
          Publish
        </button>
      </div>

      {!isPublishing && (
        <form className="w-full max-w-3xl space-y-6">
          {/* Blog Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 text-lg text-gray-900 bg-white rounded-md shadow-md border border-gray-300 outline-none transition focus:ring-2 focus:ring-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label htmlFor="coverImage" className="block text-lg font-semibold text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-md shadow-md border border-gray-300">
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
                className="cursor-pointer px-4 py-2 text-white font-medium bg-green-600 rounded-md hover:bg-green-700 transition"
              >
                Choose File
              </label>
              <span className="text-gray-500">{coverImage?.name || "No file selected"}</span>
            </div>
          </div>

          {/* Blog Content - React Quill Editor */}
          <div>
            <label htmlFor="body" className="block text-lg font-semibold text-gray-700 mb-2">
              Your Story
            </label>
            <ReactQuill
              value={body}
              onChange={setBody}
              className="w-full h-64 text-lg bg-white rounded-md shadow-md border border-gray-300"
              required
            />
          </div>
        </form>
      )}

      {/* Full-screen Loader Overlay when Publishing */}
      {isPublishing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-md">
          <div className="flex flex-col items-center">
            <ImSpinner8 className="animate-spin text-4xl text-green-600" />
            <p className="text-gray-700 mt-2 text-lg">Publishing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
