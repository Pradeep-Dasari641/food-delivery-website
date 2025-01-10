import React, { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css"

function TopRestaurants({ topRestaurants }) {
  const [filterTopRatedRestaurants, setFilterTopRatedRestaurants] = useState([]);
  const [userTopRatedRestaurantSearch, setUserTopRatedRestaurantSearch] = useState("");
  let navigate = useNavigate()

  useEffect(() => {
    let topRestaurantsCopy = [...topRestaurants];
    let filteredResult = topRestaurantsCopy.filter((item, i) => {
      if (
        item.info.name
          .toLowerCase()
          .includes(userTopRatedRestaurantSearch.toLowerCase()) == true
      ) {
        return true;
      }
    });
    setFilterTopRatedRestaurants(filteredResult);
  }, [userTopRatedRestaurantSearch]);

  const SortRestaurants = (category) =>{
    let topRestaurantsCopy = [...topRestaurants]
    let filteredResult = null
       if(category = "ratingHighToLow"){
          filteredResult = topRestaurantsCopy.sort( (a,b) => {
            return b.info.avgRating - a.info.avgRating
          })
       }else if(category == "fastDelivery"){
        filteredResult = topRestaurantsCopy.sort( (a,b) => {
            return b.info.sla.deliveryTime - a.info.sla.deliveryTime
          })
       }
       setFilterTopRatedRestaurants(filteredResult)
  }

  return (
    <>
      <div className="col-10 top-restaurants" style={{marginTop: "100px"}}>
        <h1 style={{ margin: "30px 0px" }}>Top Restaurants</h1>

        <div className="tags">
          <input
            style={{ width: "400px" }}
            onChange={(e) => {
              setUserTopRatedRestaurantSearch(e.target.value);
            }}
            value={userTopRatedRestaurantSearch}
            className="form-control form-control-lg"
            type="text"
            placeholder="Search Top Rated Restaurants"
            aria-label=".form-control-lg example"
          />
          <button
            type="button"
            style={{ marginLeft: "15px", width: "200px" }}
            className="btn btn-success"
            onClick={ () => {
                SortRestaurants("ratingHighToLow")
            }}
          >
           <i className="fa-solid fa-star"></i> Rating High to Low
          </button>

          <button
            type="button"
            style={{ marginLeft: "15px", width: "200px" }}
            className="btn btn-success"
            onClick={ () => {
                SortRestaurants("fastDelivery")
            }}
          >
           <i className="fa-solid fa-motorcycle"></i> Fast Delivery
          </button>
        </div>

       
        <div className="row row-cols-1 row-cols-md-3 g-4 top-rated-restaurants">
          {topRestaurants.length == 0 ? <Shimmer /> : ""}
          {filterTopRatedRestaurants.length == 0 && userTopRatedRestaurantSearch == "" ?
           topRestaurants.map((item, i) => {
                return (
                  <div
                  key={item.info.id}
                  onClick={ () => {
                    navigate(`/menu/${item.info.name}/${item.info.id}`)
                  }}
                   className="col">
                    <div className="card">
                      <img
                        className="restaurant-image"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.cloudinaryImageId}`}
                      />
                      <div className="card-body">
                        <h3 className="card-title">{item.info.name}</h3>
                        <h6>
                          <svg style={{color: `${item.info.avgRating >= 4.2 ? "green" : "yellow"}`}}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>

                          <span style={{ marginLeft: "5px" }}>
                            {item.info.avgRatin ? item.info.avgRatin : item.info.avgRatingString}
                            <i className="fa-solid fa-motorcycle"></i>
                            <span style={{ marginLeft: "5px" }}>
                              {item.info.sla.slaString}
                            </span>
                          </span>
                        </h6>
                        <p style={{ marginBottom: "2px" }}className="card-text">
                          {item.info.cuisines.slice(0, 3).join(",")}
                        </p>
                        <p style={{ marginBottom: "0px" }} className="card-text">
                          {item.info.areaName}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : filterTopRatedRestaurants.map((item, i) => {
                return (
                  <div 
                  onClick={ () => {
            
                    navigate(`/menu/${item.info.name}/${item.info.id}`)
                  }}
                  className="col">
                    <div className="card">
                      <img
                        className="restaurant-image"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.cloudinaryImageId}`}
                      />
                      <div className="card-body">
                        <h3 className="card-title">{item.info.name}</h3>
                        <h6>
                          <svg style={{ color: `${ item.info.avgRating >= 4.2 ? "green" : "yellow"}`,}}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>

                          <span style={{ marginLeft: "5px" }}>
                            
                            {item.info.avgRating ? item.info.avgRating : item.info.avgRatingString}
                            <i className="fa-solid fa-motorcycle"></i>
                            <span style={{ marginLeft: "5px" }}>
                              {item.info.sla.slaString}
                            </span>
                          </span>
                        </h6>
                        <p style={{ marginBottom: "2px" }} className="card-text" >
                          {item.info.cuisines.slice(0, 3).join(",")}
                        </p>
                        <p style={{ marginBottom: "0px" }} className="card-text" >
                          {item.info.areaName}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          {userTopRatedRestaurantSearch != "" && filterTopRatedRestaurants.length == 0 ? (
            <h4 className="not-found"> <i className="fa-regular fa-face-frown"></i> Sorry! we can't find any Top Restaurants with this Name! </h4>
          ) : ( "")}

          
        </div>
      </div>
    </>
  );
}

export default TopRestaurants;
