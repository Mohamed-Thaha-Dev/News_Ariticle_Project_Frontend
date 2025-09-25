import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "./AuthApi";
import axiosInstance from "../Features/LoginPage/userLoginToken";

const allNewsPage = ()=>{
  const [allNews, setAllNews] = useState([]);
  const [allNewMessage, setAllNewsMessage] = useState("");
  const [allNewsIsLoading, setAllNewsIsLoading] = useState(false);
  const [allNewsError, setAllNewsError] = useState(null);

 useEffect(() => {
    const fetchAllNews = async () => {
      try {
       setAllNewsIsLoading(true)
        const response = await axiosInstance.get(`${baseURL}/news/all`,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer" + localStorage.getItem("accessToken"), // or sessionStorage
          },
        });
        console.log(response.data)
        setAllNewsMessage(response.data.message);
       
        if (response.data.data && Array.isArray(response.data.data)) {
          setAllNews(response.data.data);
        } else {
          setAllNews([]);
          console.log("this is working")
        }

      } catch (err) {
        console.error("API Error:", err.response.data);
        setAllNewsError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setAllNewsIsLoading(false);
      }
    };

    fetchAllNews();
  }, []);


return {allNews,allNewMessage,allNewsIsLoading,allNewsError}


}

export default allNewsPage
