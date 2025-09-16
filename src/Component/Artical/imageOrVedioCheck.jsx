import Slider from "react-slick"; // Make sure react-slick is installed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaCarousel = ({ mediaUrl }) => {
  // Ensure mediaUrl is an array
  if (!mediaUrl || !Array.isArray(mediaUrl)) return null;

const settings = {
  dots: true,             // Shows the navigation dots
  infinite: true,         // Enables looping back to the first slide after the last
  speed: 500,             // Animation speed in ms
  slidesToShow: 1,        // Show 1 slide at a time
  slidesToScroll: 1,      // Scroll 1 slide at a time
  autoplay: true,         // Enables auto-scrolling
  autoplaySpeed: 4000,    // Time in ms between auto scrolls (3 seconds)
};

  return (
    <Slider {...settings}>
      {mediaUrl.map((url, index) => {
        const ext = url.split('.').pop().toLowerCase();

        return (
          <div key={index} className="p-4">
            {["mp4", "webm", "ogg"].includes(ext) ? (
              <video controls className="w-full h-50  object-contain rounded">
                <source src={url} type={`video/${ext}`} />
              </video>
            ) : (
              <img src={url} alt={url} className="w-full h-50 object-contain rounded" />
            )}
          </div>
        );
      })}
    </Slider>
  );
};

export default MediaCarousel;
