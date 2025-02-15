// import React from "react";
// import { useState, useEffect, createContext, useContext } from "react";
// import axiosInstance from "../utils/axiosInstance";

// const UserProfileContext = createContext();

// export const useUserProfileData = () => useContext(UserProfileContext);


// export const UserProfileProvider = ({ children }) => {

//     const [loading, setLoading] = useState(false);
//     const [userProfileData, setUserProfileData] = useState({});
//     const [blogs, setBlogs] = useState([]);

//     const fetchUserData = async () => {
//         try {
//             const getUserData = await axiosInstance.get("/user/profile")
//             const profiledata = getUserData.data.data;

//             const email = profiledata.email;
//             const username = '@' + `${email.split("@")[0]}`;
//             // console.log(username)

//             localStorage.setItem("BlogHiveUser", username); // saving username in the localstorage 
//             setUserProfileData(profiledata);

//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     };


//     const fetchBlogsCreatedByUser = async () => {
//         setLoading(true)
//         try {

//             const res = await axiosInstance.get("/blog")
//             console.log(res);
//             if (!res) {
//                 console.log("no blogs fetched from the api");
//             }
//             setBlogs(res.data.data.blogs)
//             setLoading(false);

//         }
//         catch (error) {
//             console.error("Error fetching user blogs");
//         }
//     }

//     // Fetch user data from the server
//     useEffect(() => {
//         fetchUserData();
//         fetchBlogsCreatedByUser();
//     }, []);

//     console.log(blogs)
//     console.log(userProfileData)


//     return (
//         <UserProfileContext.Provider value={{
//             loading,
//             blogs,
//             userProfileData,
//             setBlogs,
//             setUserProfileData,
//             refreshUserData: () => { fetchUserData() }

//         }}>

//             {children}

//         </UserProfileContext.Provider>
//     );
// };







import React, { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserProfileContext = createContext();
export const useUserProfileData = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userProfileData, setUserProfileData] = useState({});
    const [blogs, setBlogs] = useState([]);

    // Fetch User Profile Data
    const fetchUserData = async () => {
        try {
            const getUserData = await axiosInstance.get("/user/profile");
            const profiledata = getUserData.data.data;

            const email = profiledata.email;
            const username = '@' + `${email.split("@")[0]}`;
            localStorage.setItem("BlogHiveUser", username);

            setUserProfileData(profiledata);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fetch Blogs Created by User
    const fetchBlogsCreatedByUser = async () => {
        if (!userProfileData._id) return 
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/blog`)
            console.log("Blogs fetched:", res.data);
            setBlogs(res.data.data.blogs || []);
        } catch (error) {
            console.error("Error fetching user blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch User Data on Initial Mount
    useEffect(() => {
        fetchUserData();
    }, []);

    // Fetch Blogs When User Profile Data is Available
    useEffect(() => {
        if (userProfileData._id) {
            fetchBlogsCreatedByUser(userProfileData._id);
        }
    }, [userProfileData._id]); 

    return (
        <UserProfileContext.Provider value={{
            loading,
            blogs,
            userProfileData,
            setBlogs,
            setUserProfileData,
            refreshUserData: fetchUserData, // Allows manual refresh
        }}>
            {children}
        </UserProfileContext.Provider>
    );
};
