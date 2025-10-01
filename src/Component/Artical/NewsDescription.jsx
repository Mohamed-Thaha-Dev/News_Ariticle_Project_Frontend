import React, { useState } from "react";
import axiosInstance from "../../Features/LoginPage/userLoginToken";

const NewsDescription = ({ text, newsId }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasIncrementedOnExpand, setHasIncrementedOnExpand] = useState(false);

  // ✅ Increment view ONLY first time when expanding
  const handleSeeMore = async () => {
    if (!expanded && !hasIncrementedOnExpand) {
      const token = localStorage.getItem("accessToken");
      if (newsId && token) {
        try {
          await axiosInstance.patch(
            `http://localhost:8080/news/${newsId}/views`,
            {},
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          console.log("✅ View incremented on first expand");
          setHasIncrementedOnExpand(true);
        } catch (err) {
          console.error("❌ Error incrementing view:", err);
        }
      }
    }

    setExpanded(!expanded); // toggle expand/collapse
  };

  return (
    <div>
      <p
        className={`text-gray-600 mb-5 md:mb-0 text-sm ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>

      {text.length > 100 && (
        <button
          onClick={handleSeeMore}
          className="text-blue-600 text-xs mt-1 mb-5 hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default NewsDescription;
