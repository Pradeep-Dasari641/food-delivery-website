import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import LocationSection from "./locationSection";
import TopRestaurants from "./topRestaurants";

const Home = () => {
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [locationName, setLocationName] = useState("")
  const [locationSuggestions, setLocationSuggestion] = useState([])
  const [geoLocation, setGeoLocation] = useState({ lat : "17.3266413" , lng : "78.48300859999999"})
  

  useEffect( () => {
     axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`)
     .then( (res) => {
       if(res.data.data){
        setLocationSuggestion(res.data.data)
       }
     })
  }, [locationName])

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${geoLocation.lat}&lng=${geoLocation.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      )
      .then((res) => {
        setTopRestaurants(
          res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      });
  }, [geoLocation]);

  return (
    <>
     
      <div className="continer-fluid wrapper">
        <div className="row">
         <LocationSection
         locationName={locationName}
         setLocationName={setLocationName}
         locationSuggestions={locationSuggestions}
         setTopRestaurants={setTopRestaurants}
         setGeoLocation={setGeoLocation}
         setLocationSuggestion={setLocationSuggestion}
          />

          <TopRestaurants topRestaurants={topRestaurants} />
        </div>
      </div>
    </>
  );
};

export default Home;
