
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUserProfileData } from "../context/userContext";
import { Link } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { setBlogs } = useUserProfileData();

  const isPublishDisabled = !(title && body && coverImage);

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
        console.log("Any error has occurred while uploading new blog");
      }

      const newToBeSavedBlog = res.data.data.newBlog;
      setBlogs((prevBlogs) => [...prevBlogs, newToBeSavedBlog]);
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("Failed to upload blog. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gray-50 py-2 px-6 sm:px-10">
      {/* Top Section with BlogHive button */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4">
        <Link to="/" className="text-4xl font-bold text-black">
          BlogHive <span className="text-gray-800 text-sm">Write your story ...</span>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={isPublishing || isPublishDisabled}
          className={`px-3 py-1 text-white font-medium rounded-full bg-green-600 hover:bg-green-700 transition duration-300 flex items-center gap-2 ${isPublishing || isPublishDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPublishing ? <ImSpinner8 className="animate-spin text-xl" /> : <FiUploadCloud />}
          Publish
        </button>
      </div>

      {/* Main Content Form */}
      {!isPublishing && (
        <form className="w-full max-w-4xl space-y-6">
          {/* Blog Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-2 py-1 text-lg text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-green-600 outline-none transition"
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
            <div className="flex items-center gap-4 bg-transparent border-b-2 border-gray-300">
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
                className="cursor-pointer px-4 py-1 text-white font-medium bg-green-600 rounded-md hover:bg-green-700 transition"
              >
                Choose File
              </label>
              <span className="text-gray-500">{coverImage?.name || "No file selected"}</span>
            </div>
          </div>

          {/* Blog Content - React Quill Editor */}
          <div className="outline-none">
            <label htmlFor="body" className="block text-lg font-semibold text-gray-700 mb-1">
              Your Story
            </label>
            <ReactQuill
              value={body}
              onChange={setBody}
              className="w-full h-96 bg-transparent  focus:border-green-600 outline-none transition mb-4"
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



