import axios from "axios" ; 
const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL, 
    withCredentials: true, 
});

let isRefreshing = false;
let failedRequestsQueue = [];

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.log("🔹 Attempting to refresh access token...");
                
                await axios.post(
                  `${baseURL}/user/refresh-token`,
                    {},
                    { withCredentials: true } // Sends refresh token automatically
                );

                console.log("✅ Access token refreshed!");

                // Retry all queued requests
                failedRequestsQueue.forEach((promise) => promise.resolve());
                failedRequestsQueue = [];

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("❌ Refresh token failed, forcing logout...");
                failedRequestsQueue.forEach((promise) => promise.reject(refreshError));
                failedRequestsQueue = [];
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
