import React from "react";

const restaurants = [
  {
    id: 1,
    name: "SS Hyderabad Biryani",
    image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_218,w_4288,h_2412,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/raj-park-hotel---chennai/Restaurant_at_Raj_Park_Hotel__in_Alwarpet,_Chennai,_1",
    rating: "4.3 ★",
  },
  {
    id: 2,
    name: "Anjappar Chettinad",
    image: "https://b.zmtcdn.com/data/pictures/1/65521/52234e19e85430de34b4ef42ea9a6d3f_featured_v2.jpg",
    rating: "4.0 ★",
  },
  {
    id: 3,
    name: "A2B (Adyar Ananda Bhavan)",
    image: "https://www.hotelieracademy.org/wp-content/uploads/2017/03/Dining-Room1-1500x844-1500x844.jpg",
    rating: "4.1 ★",
  },
    {
    id: 4,
    name: "SS Hyderabad Biryani",
    image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_218,w_4288,h_2412,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/raj-park-hotel---chennai/Restaurant_at_Raj_Park_Hotel__in_Alwarpet,_Chennai,_1",
    rating: "4.3 ★",
  },
  {
    id: 5,
    name: "Anjappar Chettinad",
    image: "https://b.zmtcdn.com/data/pictures/1/65521/52234e19e85430de34b4ef42ea9a6d3f_featured_v2.jpg",
    rating: "4.0 ★",
  },
  {
    id: 6,
    name: "A2B (Adyar Ananda Bhavan)",
    image: "https://www.hotelieracademy.org/wp-content/uploads/2017/03/Dining-Room1-1500x844-1500x844.jpg",
    rating: "4.1 ★",
  },
    {
    id: 7,
    name: "A2B (Adyar Ananda Bhavan)",
    image: "https://www.hotelieracademy.org/wp-content/uploads/2017/03/Dining-Room1-1500x844-1500x844.jpg",
    rating: "4.1 ★",
  }
];

const RestaurantList = () => {
  return (
    <div className="flex flex-col gap-4 mt-30">
      {restaurants.map((r) => (
        <div
          key={r.id}
          className="flex items-center gap-4 p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
        >
          <img
            src={r.image}
            alt={r.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{r.name}</h3>
            <p className="text-gray-600">{r.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
