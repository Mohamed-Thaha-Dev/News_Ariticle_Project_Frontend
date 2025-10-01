import { motion } from "framer-motion";
import News from "../../AllApi/News";

import NewsCardSkeleton from "../NewsCardSkeletonLoader/NewsCardSkeletonLoader";

import { useContext, useEffect, useState } from "react";
import { likeOnClick, unlikeOnClick } from "../../AllApi/newApi";

import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext, LoginProvider } from "../../ContextStore/UserProfile";
import NewsItem from "../AllNews/NewsItem";

//  {
//     "newsTitle": "சென்னை நகரில் கனமான மழை",
//     "newsDescription": "தாம்பரம், சென்னை 10 நாட்களாக வெப்பம் அதிகமாக இருந்தது. இன்று காலை முதல் மாலை வரை தொடர்ந்து மழை பெய்து, சில பகுதிகளில் வெள்ளப்பெருக்கு ஏற்பட்டுள்ளது. மக்கள் வீட்டிற்குள் தங்கியிருப்பதாகவும், சில முக்கிய சாலைகள் கடந்து செல்ல முடியாமல் இருக்கின்றன. மழை காரணமாக பள்ளிகள் மற்றும் பல்கலைக்கழகங்கள் சில நேரம் இடைநிறுத்தப்பட்டுள்ளன. நிவாரணப் பணிகள் மற்றும் அவசரப் பணிகள் மழை பகுதிகளில் தீவிரமாக நடைபெற்று வருகின்றன. மேலும், இன்று இரவு வரை கனமழை தொடரும் என வானிலை அலுவலகம் தகவல் தெரிவித்துள்ளது.",
//     "imageOrVideoUrl": [
//       "D:/Users/newsUploads/e41d7087-8a55-4423-a009-3a098656add9_20250912165557.jpg",
//       "D:/Users/newsUploads/a7b7ccce-3681-44e1-87e0-3bf236d710b9_20250912165557.jpg",
//       "D:/Users/newsUploads/9a5934bd-3fba-48d2-9a1e-d786af3460e5_20250912165557.mkv"
//     ],
//     "author": "shajith.yifa@gmail.com",
//     "category": "இறைவு/வானிலை",
//     "tags": "[மழை, வெள்ளப்பெருக்கு, நிவாரணம், வானிலை]",
//     "status": "PUBLISHED",
//     "views": 0,
//     "likes": 0,
//     "unLikes": 0,
//     "createdAt": "2025-09-12 16:55:57",
//     "updatedAt": "2025-09-12 16:55:57"
//   },

const NewsCard = () => {
  const { article, isloading, error, message, setError } = News();
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  // add variable

  // const [article, setArticle] = useState([]);
  // const [message, setMessage] = useState("");
  // const [isloading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  console.log(article);
  // console.log("this is  Meaasge :", message)
  // console.log("this is artical id",article);

  useEffect(() => {
    if (Array.isArray(article)) {
      setArticles(article); // set initial articles from API
    }
  }, [article]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (isloading) {
    return <NewsCardSkeleton />;
  }

  const handleLike = async (id) => {
    try {
      // const response = await axios.patch(
      //   `http://localhost:8080/news/${id}/like`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: "Bearer" + localStorage.getItem("accessToken"),
      //     },
      //   }
      // );
      const response = await likeOnClick(id);
      // update only clicked article like count
      setArticles((prev) =>
        prev.map((a) =>
          a.sNo === id
            ? {
                ...a,
                likes: response.data.totalLikes,
                likedByCurrentUser: response.data.likedByCurrentUser,
              }
            : a
        )
      );
      toast.success(response.data, {
        position: "top-right",
      });
      console.log("Like toggled  in NewsCard:", response.data);
      // TODO: update state so UI shows updated likes count
    } catch (err) {
      console.log(err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      console.error("Like error:", err);
      console.log(err.response.data?.message);
    }
    console.log(article.sNo);
  };

  const handleUnLike = async (id) => {
    try {
      // const response = await axios.patch(
      //   `http://localhost:8080/news/${id}/like`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: "Bearer" + localStorage.getItem("accessToken"),
      //     },
      //   }
      // );
      const response = await unlikeOnClick(id);
      // update only clicked article like count
      setArticles((prev) =>
        prev.map((a) =>
          a.sNo === id
            ? {
                ...a,
                unLikes: response.data.totalUnLikes,
                unLikedByCurrentUser: response.data.unLikedByCurrentUser,

              }
            : a
        )
      );
      toast.success(response.data, {
        position: "top-right",
      });
      console.log("unLike toggled  in NewsCard:", response.data);
      // TODO: update state so UI shows updated likes count
    } catch (err) {
      console.log(err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      console.error("Like error:", err);
      console.log(err.response.data?.message);
    }
    console.log(article.sNo);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-20 md:mt-25 items-stretch">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, index) => (
           
  <NewsItem
    key={article.sNo}
    article={article}
    handleLike={handleLike}
    handleUnLike={handleUnLike}
  />

          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            {message || "No news available 😔"}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
      {/* Show See More only if no error and articles exist */}
      {!error && articles.length > 0 && (
        <div className="md:mb-20 flex justify-center items-center">
          <Link
            to="/allNews"
            className="text-blue-900 text-center hover:underline"
          >
            See More
          </Link>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
    </>
  );
};

export default NewsCard;
