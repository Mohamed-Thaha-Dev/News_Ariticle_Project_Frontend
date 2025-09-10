import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../../Component/Artical/NewCard";
import RestaurantList from "../../Component/Restaurant/RestaurantList";
import HomeLoading from "../../Component/HomeLoading/HomeLoading";
import News from "../../AllApi/News";

const HomePage = () => {
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [errs,setError]= useState("")

  // useEffect(() => {
  //   axios.get("http://localhost:4000/Product")
  //     .then(res => {
  //       setArticles(res.data);
  //     })
  //     .catch(err =>setError(err.message))
  //     .finally(()=>setLoading(false))
  // }, []);

  // if (loading) {
  //   return(
  //     <HomeLoading/>
  //   )
  // }
    const {article,isloading,error} = News()
 
  
if (isloading){
  return (
    <HomeLoading/>
  )
}
 // First 4 trending news
 const trending = article.slice(0, 4);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Trending News */}
      <div className="lg:col-span-2 space-y-6">
        <NewsCard article = {trending}/>

        {/* Restaurant Ad (mobile only) */}
        <div className="lg:hidden my-6">
          <RestaurantList />
        </div>
      </div>

      {/* Restaurant Ad (desktop) */}
      <div className="hidden lg:block lg:col-span-1">
        <RestaurantList />
      </div>

    </div>
  );
};

export default HomePage;
