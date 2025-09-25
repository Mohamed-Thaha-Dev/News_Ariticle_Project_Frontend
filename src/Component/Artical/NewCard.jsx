import { motion } from "framer-motion";
import News from "../../AllApi/News";
import HomeLoading from "../HomeLoading/HomeLoading";
import MediaCarousel from "./imageOrVedioCheck";
import NewsCardSkeleton from "../NewsCardSkeletonLoader/NewsCardSkeletonLoader";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { likeOnClick, unlikeOnClick } from "../../AllApi/newApi";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext, LoginProvider } from "../../ContextStore/UserProfile";
import NewsDescription from "./NewsDescription";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

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
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-25">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, index) => (
            <motion.div
              key={article.sNo}
              className="bg-white shadow-md rounded-2xl max-h-400  overflow-hidden cursor-pointer hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              // whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Show Image or Video */}
              {article.imageOrVideoUrl && article.imageOrVideoUrl.length > 0 ? (
                <MediaCarousel mediaUrl={article.imageOrVideoUrl} />
              ) : (
                <div className="h-57 flex justify-center items-center">
                  <h1 className="text-center  text-gray-500">
                    Image not uploaded ❌
                  </h1>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{article.newsTitle}</h3>
                {/* description with see more/less */}
                <NewsDescription text={article.newsDescription} />

                {/* Like Checkbox */}
                {/* <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    icon={<Favorite />} // White heart (unliked)
                    checkedIcon={<Favorite sx={{ color: "red" }} />} // Red heart (liked)
                    checked={Boolean(article.likedByCurrentUser)}
                    onChange={() => handleLike(article.sNo)}
                  />
                  <span>{article.likes}</span>
                </div> */}

                {/* like / unlike / views row */}
                <div className="flex items-center justify-between mt-3">
                  {/* Like */}
                  <div className="flex items-center space-x-1">
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                      checked={Boolean(article.likedByCurrentUser)}
                      onChange={() => handleLike(article.sNo)}
                    />
                    <span>{article.likes}</span>
                  </div>

                  {/* Unlike */}
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Checkbox
                      icon={<ThumbDownIcon />}
                      checkedIcon={<ThumbDownIcon sx={{ color: "blue" }} />}
                      checked={Boolean(article.unLikedByCurrentUser)}
                      onChange={() => handleUnLike(article.sNo)}
                    />
                    <span>{article.unLikes}</span>
                  </div>

                  {/* Views */}
                  <div className="flex items-center space-x-1 text-gray-600">
                    <VisibilityIcon fontSize="small" />
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
