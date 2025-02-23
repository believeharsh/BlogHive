import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard"
import Spinner from "./Spinner";

const ProfilePageContent = ({ activeTab, blogs, savedBlogsByUser, loading }) => {
  if (loading) return <Spinner />;

  if (activeTab === "Your Blogs") {
    return blogs.length === 0 ? (
      <div className="py-4 text-center">You haven't written any blogs yet.</div>
    ) : (
      blogs.map((blog) => {
        const defaultProfileImage = "/images/default_Image.jpeg";
        const profileImage =
          blog.createdBy?.profileImageURL === "/public/Images/defaultImage.png"
            ? defaultProfileImage
            : blog.createdBy?.profileImageURL || defaultProfileImage;

        const defaultCoverImage = "/images/LibraryCover_Image.jpg";
        const coverImage = blog.coverImage || defaultCoverImage;

        return (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <BlogCard
              authorName={blog.createdBy?.fullName || "Unknown Author"}
              profileImageURL={profileImage}
              username={blog.createdBy?.username || "anonymous"}
              title={blog.title || "Untitled Blog"}
              body={blog.body || "No content available"}
              coverImage={coverImage}
              createdAt={blog.createdAt || new Date().toISOString()}
            />
          </Link>
        );
      })
    );
  }

  if (activeTab === "SavedBlogs") {
    return !Array.isArray(savedBlogsByUser) || savedBlogsByUser.length === 0 ? (
      <div className="py-4 text-center">You haven't saved any blogs yet.</div>
    ) : (
      savedBlogsByUser.map((savedBlog) => {
        const blog = savedBlog.savedBlogId;

        const defaultProfileImage = "/images/default_Image.jpeg";
        const profileImage =
          blog.createdBy?.profileImageURL === "/public/Images/defaultImage.png"
            ? defaultProfileImage
            : blog.createdBy?.profileImageURL || defaultProfileImage;

        const defaultCoverImage = "/images/LibraryCover_Image.jpg";
        const coverImage = blog.coverImage || defaultCoverImage;

        return (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <BlogCard
              authorName={blog.createdBy?.fullName || "Unknown Author"}
              profileImageURL={profileImage}
              username={blog.createdBy?.username || "anonymous"}
              title={blog.title || "Untitled Blog"}
              body={blog.body || "No content available"}
              coverImage={coverImage}
              createdAt={blog.createdAt || new Date().toISOString()}
            />
          </Link>
        );
      })
    );
  }

  return <div className="border-b border-gray-300 py-4 text-center">No content for this tab.</div>;
};

export default ProfilePageContent;
