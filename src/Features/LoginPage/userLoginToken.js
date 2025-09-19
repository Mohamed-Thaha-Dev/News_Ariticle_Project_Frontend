// src/api/axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL,
  // don't set Content-Type globally when you send FormData separately
  withCredentials: true, // send cookies (important for refresh endpoint)
});

// Attach access token from localStorage (or memory) on every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // if you use localStorage
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Response interceptor: on 401/403 try refresh once, then retry original request
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // if request already retried once, don't loop
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      // avoid multiple refreshes
      if (isRefreshing) {
        // queue the request until refresh is done
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh endpoint (cookie will be sent because withCredentials=true)
        const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = res.data?.accessToken;
        console.log(res.data)
       if (!newToken) throw new Error("No authToken in refresh response");
localStorage.setItem("accessToken", newToken);

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem("accessToken");
        // optionally redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
