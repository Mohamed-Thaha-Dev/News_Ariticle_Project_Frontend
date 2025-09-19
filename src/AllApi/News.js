import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const [article, setArticle] = useState([]);
  const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news/home");
        console.log(response.data)
        setMessage(response.data.message);

        if (response.data.data && Array.isArray(response.data.data)) {
          setArticle(response.data.data);
        } else {
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

  return { article, message, isloading, error };
};

export default News;
