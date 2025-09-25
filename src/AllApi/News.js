import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../Features/LoginPage/userLoginToken";


 const baseURL = "http://localhost:8080"
const News = () => {
  const [article, setArticle] = useState([]);
  const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


const token = localStorage.getItem("accessToken");
const headers = token ? { Authorization: `Bearer ${token}` } : {};


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        // const response = await axiosInstance.get(`${baseURL}/news/home`,{
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: "Bearer " + localStorage.getItem("accessToken"), // or sessionStorage
        //   }})
        const response = await axiosInstance.get(`${baseURL}/news/home`,{headers});
        console.log(response.data)
        setMessage(response.data.message);
        if (response.data.data && Array.isArray(response.data.data)) {
          setArticle(response.data.data);
        } 
        else {
          setArticle([]);
          console.log("this is working")
        }

      } catch (err) {
        console.error("API Error:", err.message);
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { article, message, isloading, error,setError };
};

export default News;

