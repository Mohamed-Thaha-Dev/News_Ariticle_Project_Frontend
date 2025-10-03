// // src/api/axiosInstance.js
// import axios from "axios";

// const baseURL = "http://localhost:8080";

// const axiosInstance = axios.create({
//   baseURL,
//   // don't set Content-Type globally when you send FormData separately
//   withCredentials: true, // send cookies (important for refresh endpoint)
// });

// // Attach access token from localStorage (or memory) on every request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken"); // if you use localStorage
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// }, (error) => Promise.reject(error));

// // Response interceptor: on 401/403 try refresh once, then retry original request
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(p => {
//     if (error) p.reject(error);
//     else p.resolve(token);
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;

//     // if request already retried once, don't loop
//     if ((status === 401 || status === 403) && !originalRequest._retry) {
//       // avoid multiple refreshes
//       if (isRefreshing) {
//         // queue the request until refresh is done
//         return new Promise(function(resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//         .then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//          return axiosInstance(originalRequest); // ✅ retry original request
//         })
//         .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // call refresh endpoint (cookie will be sent because withCredentials=true)
//         const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
//         const newToken = res.data?.accessToken;
//         console.log(res.data)
//        if (!newToken) throw new Error("No authToken in refresh response");
// localStorage.setItem("accessToken", newToken);

//         processQueue(null, newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axios(originalRequest);
//       } catch (refreshErr) {
//         processQueue(refreshErr, null);
//         localStorage.removeItem("accessToken");
//         // optionally redirect to login
//         window.location.href = "/login";
//         return Promise.reject(refreshErr);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



// src/api/axiosInstance.js
// import axios from "axios";

// const baseURL = "http://localhost:8080"; // change to your backend URL

// const axiosInstance = axios.create({
//   baseURL,
//   withCredentials: true, // send cookies for refreshToken
// });

// // Attach access token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle accessToken expiration
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;
//     console.log("Response Status:", status , "Data:", error.response?.data); // ✅ idhula status print aagum


//     // If 401/403 and request not retried
//     if ((status === 401 || status === 403) && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosInstance(originalRequest); // ✅ retry original
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         // Call refresh endpoint
//         const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
//         console.log(res)
//         const newToken = res.data?.accessToken;
//         console.log(newToken)
//         if (!newToken) throw new Error("No accessToken from refresh");

//         localStorage.setItem("accessToken", newToken);
//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest); // ✅ retry original
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login"; // redirect to login
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// src/api/axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080"; // change to your backend URL

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // send cookies for refreshToken
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle accessToken expiration
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

     const backendMessage = error.response?.data.message;

    //🔥 Global toast for errors
    if (status === 401 || status === 403) {
      toast.error(backendMessage,{
        position: "top-right",
      },);
    } else {
      toast.error(backendMessage, {
        position: "top-right",
      });
    }

    console.log("Response Status:", status, "Data:", error.response.data.message);

    // If 401/403 and request not retried
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 🚀 Refresh request → use plain axios (not axiosInstance)
        const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = res.data?.accessToken;

        console.log("New AccessToken:", newToken);

        if (!newToken) throw new Error("No accessToken from refresh");

        localStorage.setItem("accessToken", newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // retry original
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
