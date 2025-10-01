import React, { useState, useEffect, useCallback } from "react";
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
import NewsItem from "./NewsItem";

const AllNews = () => {
  const { allNews, allNewMessage, allNewsIsLoading, allNewsError,setAllNewsError } =
    allNewsPage();
  const [allNewsArticle, setAllNewsArticle] = useState([]);

  useEffect(() => {
    if (Array.isArray(allNews)) {
      setAllNewsArticle(allNews); // set initial articles from API
    }
  }, [allNews]);


    useEffect(() => {
    if (allNewsError) {
      const timer = setTimeout(() => {
        setAllNewsError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [allNewsError, setAllNewsError]);

  // const handleLike = async (id) => {
  //   try {
  //   //    const response = await axiosInstance.patch(
  //   //      `http://localhost:8080/news/${id}/like`,
  //   //      {},
  //   //      {
  //   //        headers: {
  //   //          Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //   //        },
  //   //      }
  //   //    );
  //     const response = await likeOnClick(id);
  //     // update only clicked article like count
  //     setAllNewsArticle((prev) =>
  //       prev.map((a) =>
  //         a.sNo === id
  //           ? {
  //               ...a,
  //               likes: response.data.totalLikes,
  //               likedByCurrentUser: response.data.likedByCurrentUser,
  //             }
  //           : a
  //       )
  //     );
  //     toast.success(response.data, {
  //       position: "top-right",
  //     });
  //     console.log("Like toggled AllNews:", response.data);
  //     // TODO: update state so UI shows updated likes count
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response?.status === 403 || err.response?.status === 401) {
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 5000);
  //     }
  //     toast.error(err.response?.data?.message, {
  //       position: "top-right",
  //     });
  //     console.error("Like error:", err);
  //     console.log(err.response.data?.message);
  //   }
  //   console.log(allNewsArticle.sNo);
  // };


  const handleLike = useCallback(async (id) => {
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
      // if (err.response?.status === 403 || err.response?.status === 401) {
      //   setTimeout(() => {
      //     navigate("/login");
      //   },1000);
      // }
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      console.error("Like error:", err);
      console.log(err.response.data?.message);
    }
    console.log(allNewsArticle.sNo);
  }, [allNewsArticle]); // dependency: articles

  const handleUnLike = useCallback(async (id) => {
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
      // if (err.response?.status === 403 || err.response?.status === 401) {
      //   setTimeout(() => {
      //     navigate("/login");
      //   }, 5000);
      // }
      toast.error(err.response?.data?.message, {
        position: "top-right",
      });
      console.error("Like error:", err);
      console.log(err.response.data?.message);
    }
    console.log(allNewsArticle.sNo);
  }, [allNewsArticle]); // dependency: articles




  // const handleUnLike = async (id) => {
  //   try {
  //     //  const response = await axios.patch(
  //     //    `http://localhost:8080/news/${id}/like`,
  //     //    {},
  //     //    {
  //     //      headers: {
  //     //        Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //     //      },
  //     //    }
  //     //  );
  //     const response = await unlikeOnClick(id);
  //     // update only clicked article like count
  //     setAllNewsArticle((prev) =>
  //       prev.map((a) =>
  //         a.sNo === id
  //           ? {
  //               ...a,
  //               unLikes: response.data.totalUnLikes,
  //               unLikedByCurrentUser: response.data.unLikedByCurrentUser,
  //             }
  //           : a
  //       )
  //     );
  //     toast.success(response.data, {
  //       position: "top-right",
  //     });
  //     console.log("Like toggled AllNews:", response.data);
  //     // TODO: update state so UI shows updated likes count
  //   } catch (err) {
  //     console.log(err);
  //     if (err.response?.status === 403 || err.response?.status === 401) {
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 5000);
  //     }
  //     toast.error(err.response?.data?.message, {
  //       position: "top-right",
  //     });
  //     console.error("Like error:", err);
  //     console.log(err.response.data?.message);
  //   }
  //   console.log(allNewsArticle.sNo);
  // };

  if (allNewsIsLoading) {
    return <AllNewsCardSkeletonLoader />;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-[90%] m-auto gap-5 mt-25 mb-25">
        {Array.isArray(allNewsArticle) && allNewsArticle.length > 0 ? (
          allNewsArticle.map((article, index) => (
             <NewsItem
                key={article.sNo}
                article={article}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
              />
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
