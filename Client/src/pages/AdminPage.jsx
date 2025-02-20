import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        latestUsers: [],
        latestBlogs: [],
        totalUsers: 0,
        totalBlogs: 0,
        pendingApprovals: 0,
    });

    // console.log(dashboardData)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const res = await axiosInstance.get("/admin/Admin-DashBoard");
                setDashboardData(res.data.data);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <button className="text-white font-medium text-xl my-2 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                <IoArrowBack /> Back
            </button>
            <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={dashboardData.totalUsers} color="text-blue-400" />
                <StatCard title="Total Blogs" value={dashboardData.totalBlogs} color="text-green-400" />
                <StatCard title="Pending Approvals" value={dashboardData.pendingApprovals} color="text-red-400" />
            </div>

            <LatestUsers users={dashboardData.latestUsers} />
            <LatestBlogs blogs={dashboardData.latestBlogs} />
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-400">{title}</h2>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const LatestUsers = ({ users = [] }) => (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-400 mb-4">Latest Registered Users</h2>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse border border-gray-700 text-gray-300">
                <thead>
                    <tr className="bg-gray-700 text-gray-300">
                        <th className="border border-gray-600 px-4 py-2">Profile</th>
                        <th className="border border-gray-600 px-4 py-2">Name</th>
                        <th className="border border-gray-600 px-4 py-2">Email</th>
                        <th className="border border-gray-600 px-4 py-2">Joined On</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border border-gray-600 px-4 py-2">
                                    <img src={user.profileImageURL === "/public/Images/defaultImage.png" ? "/images/default_Image.jpeg" : user.profileImageURL} alt={user.fullName} className="w-10 h-10 rounded-full mx-auto" />
                                </td>
                                <td className="border border-gray-600 px-4 py-2">{user.fullName}</td>
                                <td className="border border-gray-600 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-600 px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">No recent users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const LatestBlogs = ({ blogs = [] }) => (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-400 mb-4">Latest Blogs</h2>
        {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-40 object-cover rounded-md mb-3" />
                        <h3 className="text-md font-bold text-gray-300">
                            <a href={`/blog/${blog._id}`} className="hover:underline">{blog.title}</a>
                        </h3>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                            <img src={blog.createdBy.profileImageURL} alt={blog.createdBy.fullName} className="w-6 h-6 rounded-full mr-2" />
                            <div>
                                <p className="font-semibold text-gray-300">{blog.createdBy.fullName}</p>
                                <p className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 text-center">No recent blogs found.</p>
        )}
    </div>
);

export default AdminDashboard;
