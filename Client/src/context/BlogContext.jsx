import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { useUserProfileData } from "./userContext";
import axiosInstance from "../utils/axiosInstance";

const blogContext = createContext();

export const useBlogs = () => useContext(blogContext);

export const BlogsProvider = ({ children }) => {

    const [loading, setLoading] = useState(false) ; 
    const [savedBlogsByUser, setSavedBlogsByUser] = useState([]) ; 
    const {userProfileData} = useUserProfileData() ; 
    const userId = userProfileData._id
  
    useEffect(() => {
      const fetchSavedBlogs = async () => {
        try {
          const response = await axiosInstance.get(`/blog/saved-blogs/${userId}`);
          setSavedBlogsByUser(response.data.data)
          console.log(response)
          
        } catch (error) {
          console.error("Error fetching saved blogs:", error);
        }
      };
  
      if (userId) {
        fetchSavedBlogs();
      }
    }, [userId]);

    console.log(savedBlogsByUser)

    return (
        <blogContext.Provider value={{ loading, savedBlogsByUser, userId, setSavedBlogsByUser }}>
            {children}
        </blogContext.Provider>
    );
};