import React from 'react'
import { useState } from "react";


const NewsDescription = ({ text }) => {
      const [expanded, setExpanded] = useState(false);
    //   if (!text) return <p>No description available</p>; // null/undefined handle
  return (
     <div>
      <p
        className={`text-gray-600 text-sm ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      {text.length > 100 && ( // only show toggle if text is long
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-xs mt-1 hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  )
}

export default NewsDescription