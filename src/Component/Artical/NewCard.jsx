import React from "react";
import { motion } from "framer-motion";
import News from "../../AllApi/News";
import HomeLoading from "../HomeLoading/HomeLoading";

const NewsCard = ({article}) => {
  const {isloading, error } = News();
  if (isloading) {
    return (   
    <div>
      <HomeLoading/>
    </div>
    )
  } 
  else {
    return(
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-30">
        {article.map((article) => (
          <motion.div
            key={article.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-50 h-48 object-contain mx-auto"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.description}</p>
            </div>
          </motion.div>
        ))}
        {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    <strong className="font-bold">Oops! </strong>
    <span className="block sm:inline">{error}</span>
  </div>
)}

      </div>
      
    )
    {
      error && <h1>This is Error message - {error}</h1>
    }
  }
};

export default NewsCard;
