import { motion } from "framer-motion";
import News from "../../AllApi/News";
import HomeLoading from "../HomeLoading/HomeLoading";
import MediaCarousel from "./imageOrVedioCheck";
import NewsCardSkeleton from "../NewsCardSkeletonLoader/NewsCardSkeletonLoader";


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
  const {article,isloading, error } = News();
  console.log(article)
  if(isloading){
    return <NewsCardSkeleton/>
  }
    return(
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-25 mb-20">
        {article.map((article) => (
          <motion.div
            key={article.sNo}
            className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
             {/* Show Image or Video */}
          <MediaCarousel mediaUrl={article.imageOrVideoUrl}/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{article.newsTitle}</h3>
              <p className="text-gray-600 text-sm">{article.newsDescription}</p>
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

export default NewsCard;
