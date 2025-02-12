import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


const UserProfileContext = createContext();

export const useUserProfileData = () => useContext(UserProfileContext);


export const UserProfileProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [userProfileData, setUserProfileData] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const fetchUserData = async () => {
        try {
            const getUserData = await axios.get("/user/profile")
            const profiledata = getUserData.data.data;

            const email = profiledata.email;
            const username = '@' + `${email.split("@")[0]}`;
            console.log(username)

            localStorage.setItem("BlogHiveUser", username); // saving username in the localstorage 
            setUserProfileData(profiledata);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    const fetchBlogsCreatedByUser = async () => {
        setLoading(true)
        try {

            const res = await axios.get("/blog")
            console.log(res);
            if (!res) {
                console.log("no blogs fetched from the api");
            }
            setBlogs(res.data.data.blogs)
            setLoading(false);

        }
        catch (error) {
            console.error("Error fetching user blogs");
        }
    }

    // Fetch user data from the server
    useEffect(() => {
        fetchUserData();
        fetchBlogsCreatedByUser();
    }, []);


    return (
        <UserProfileContext.Provider value={{
            loading,
            blogs,
            userProfileData,
            setBlogs,
            setUserProfileData,
            refreshUserData: () => {fetchUserData()} 

        }}>

            {children}

        </UserProfileContext.Provider>
    );
};