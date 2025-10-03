import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import MediaCarousel from "../Artical/imageOrVedioCheck";
import NewsDescription from "../Artical/NewsDescription";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // 3-dot icon
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReportNews } from "../../AllApi/newApi";
import ReportMenu from "./ReportMenu";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";

const NewsItem = ({ article, handleLike, handleUnLike }) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const mediaUrls = Array.isArray(article.imageOrVideoUrl)
    ? article.imageOrVideoUrl
    : [];

  // const handleMenuClick = (event) => {
  //   setAnchor(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchor(null);
  // };
  const handelGetDetalis = () => {};

  return (
    <motion.div
      key={article.sNo}
      className=" shadow-md bg-blue-100 relative  overflow-hidden rounded-2xl hover:shadow-lg flex flex-col"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ✅ Header */}
    <CardHeader
  sx={{ bgcolor: blue[200] }}
  avatar={
    <Tooltip
      title={
        <div>
          <strong>{article.authorName || "Unknown User"}</strong>
          <br />
          <span>{article.authorEmail || "No Email"}</span>
        </div>
      }
      arrow
      placement="bottom"
    >
      <Avatar
        sx={{ bgcolor: red[500], placeItems: "center", cursor: "pointer" }}
        src={article.authorProfileUrl || ""}
        alt={article.authorName}
      >
        {!article.authorProfileUrl &&
          (article.authorName
            ? article.authorName[0].toUpperCase()
            : "U")}
      </Avatar>
    </Tooltip>
  }
  title={article.authorName?.toUpperCase() || "Unknown User"}
  subheader={article.updatedAt?.substring(0, 10) || "Just now"}
/>

      {/* Top-right 3-dot menu */}
      {/* Report menu button */}
      <ReportMenu article={article} />
      {mediaUrls.length > 0 ? (
        <div className="mt-10">
          <MediaCarousel mediaUrl={mediaUrls} />
        </div>
      ) : (
        <div className="h-57 flex justify-center items-center mt-10">
          <h1 className="text-center text-gray-500">Image not uploaded ❌</h1>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{article.newsTitle}</h3>

        <NewsDescription text={article.newsDescription} newsId={article.sNo} />

        <div className="flex items-center gap-4 justify-end absolute right-5  bottom-2">
          <div className="flex items-center space-x-1">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              checked={Boolean(article.likedByCurrentUser)}
              onChange={() => handleLike(article.sNo)}
            />
            <span>{article.likes}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <Checkbox
              icon={<ThumbDownIcon />}
              checkedIcon={<ThumbDownIcon sx={{ color: "blue" }} />}
              checked={Boolean(article.unLikedByCurrentUser)}
              onChange={() => handleUnLike(article.sNo)}
            />
            <span>{article.unLikes}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <Checkbox
              icon={<VisibilityIcon />}
              checkedIcon={<VisibilityIcon sx={{ color: "red" }} />}
              checked={Boolean(article.viewedByCurrentUser)}
            />
            <span>{article.views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ✅ Memoize to prevent unnecessary re-renders
export default React.memo(
  NewsItem,
  (prev, next) =>
    prev.article.likes === next.article.likes &&
    prev.article.unLikes === next.article.unLikes &&
    prev.article.likedByCurrentUser === next.article.likedByCurrentUser &&
    prev.article.unLikedByCurrentUser === next.article.unLikedByCurrentUser &&
    prev.article.views === next.article.views &&
    prev.article.newsDescription === next.article.newsDescription
);
