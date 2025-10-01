import Slider from "react-slick"; // Make sure react-slick is installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const MediaCarousel = ({ mediaUrl }) => {
  // Ensure mediaUrl is an array
  if (!Array.isArray(mediaUrl) || mediaUrl.length === 0) {
    return (
      <div className="h-64 flex justify-center items-center">
        <h1 className="text-gray-500">No media uploaded ❌</h1>
      </div>
    );
  }

  const settings = {
    dots: true, // Shows the navigation dots
    infinite: true, // Enables looping back to the first slide after the last
    speed: 500, // Animation speed in ms
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enables auto-scrolling
    autoplaySpeed: 4000,
    arrows: false, // 🚫 Hide prev/next arrows
    // Time in ms between auto scrolls (3 seconds)
  };

  return (
    <Slider {...settings}>
      {mediaUrl.map((url, index) => {
        const cleanUrl = url.split("?")[0]; // remove query string
        const ext = cleanUrl.split(".").pop().toLowerCase();
        // Optional WebP support
        const webpSrc = url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        const [loaded, setLoaded] = useState(false);
        return (
          <div key={index} className="p-4">
            {["mp4", "webm", "ogg"].includes(ext) ? (
              <video controls className="w-full h-50  object-contain rounded">
                <source src={url} type={`video/${ext}`} />
              </video>
            ) : (
              <div className="relative w-full h-50">
                {/* Blurred placeholder */}
                <img
                  src={webpSrc}
                  alt={url}
                  className={`absolute top-0 left-0 w-full h-full object-contain rounded blur-xl transition-opacity duration-500 ${
                    loaded ? "opacity-0" : "opacity-100"
                  }`}
                />
                {/* Actual image */}
                <img
                  src={url}
                  alt={url}
                  loading="lazy"
                  width={600} // ✅ width & height to prevent CLS
                  height={400}
                  onLoad={() => setLoaded(true)}
                  className={`w-full h-full object-contain rounded transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </Slider>
  );
};

export default MediaCarousel;
