import React, { useState, useEffect } from "react";
import MediaCarousel from "../Artical/imageOrVedioCheck";
import allNewsPage from "../../AllApi/AllNews";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import axios from "axios";
import NewsCardSkeleton from "../NewsCardSkeletonLoader/NewsCardSkeletonLoader";
import AllNewsCardSkeletonLoader from "../NewsCardSkeletonLoader/AllNewsCardSkeletonLoader";
import { likeOnClick, unlikeOnClick } from "../../AllApi/newApi";
import NewsDescription from "../Artical/NewsDescription";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { blue } from "@mui/material/colors";
import axiosInstance from "../../Features/LoginPage/userLoginToken";

const AllNews = () => {
  const { allNews, allNewMessage, allNewsIsLoading, allNewsError } =
    allNewsPage();
  const [allNewsArticle, setAllNewsArticle] = useState([]);

  useEffect(() => {
    if (Array.isArray(allNews)) {
      setAllNewsArticle(allNews); // set initial articles from API
    }
  }, [allNews]);

  const handleLike = async (id) => {
    try {
    //    const response = await axiosInstance.patch(
    //      `http://localhost:8080/news/${id}/like`,
    //      {},
    //      {
    //        headers: {
    //          Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //        },
    //      }
    //    );
      const response = await likeOnClick(id);
      // update only clicked article like count
      setAllNewsArticle((prev) =>
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
      console.log("Like toggled AllNews:", response.data);
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
    console.log(allNewsArticle.sNo);
  };

  const handleUnLike = async (id) => {
    try {
      //  const response = await axios.patch(
      //    `http://localhost:8080/news/${id}/like`,
      //    {},
      //    {
      //      headers: {
      //        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //      },
      //    }
      //  );
      const response = await unlikeOnClick(id);
      // update only clicked article like count
      setAllNewsArticle((prev) =>
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
      console.log("Like toggled AllNews:", response.data);
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
    console.log(allNewsArticle.sNo);
  };

  if (allNewsIsLoading) {
    return <AllNewsCardSkeletonLoader />;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-[90%] m-auto gap-5 mt-25 mb-25">
        {Array.isArray(allNewsArticle) && allNewsArticle.length > 0 ? (
          allNewsArticle.map((article, index) => (
            <motion.div
              key={article.sNo}
              className="bg-blue-100 shadow-md rounded-2xl max-h-200 overflow-hidden cursor-pointer hover:shadow-lg"
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
                {/* <p className="text-gray-600 text-sm">
                  {article.newsDescription}
                </p> */}
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
            {allNewMessage || "No news available 😔"}
          </div>
        )}

        {allNewsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-90 rounded relative">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{allNewsError}</span>
          </div>
        )}
      </div>
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

export default AllNews;
