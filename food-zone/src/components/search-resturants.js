import React, { useEffect, useState } from "react";
import "./searchRes.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchRestaurant() {
  let [restaurantName, setRestaurantName] = useState("");
  let [restaurant, setRestaurant] = useState(null);
  let [similarRestaurants, setSimilarRestaurants] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setRestaurant(null);
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.379608000000015&lng=78.436249&str=${restaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=6e9516bc-6be1-97fc-4258-58cc5e4cd423&`
      )
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT) {
          if (
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards[0]
          ) {
            setRestaurant(
              res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
                ?.cards[0].card?.card?.info
            );
          }
          setSimilarRestaurants(
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards[1]?.card?.card?.restaurants
          );
        }
      });
  }, [restaurantName]);

  return (
    <>
      <div className="search-res-bar">
        <input
          className="input-res"
          value={restaurantName}
          onChange={(e) => {
            setRestaurantName(e.target.value);
          }}
          placeholder="Search for Restaurants"
        />
        <i className="fa-solid fa-magnifying-glass searchMag"></i>
      </div>

      {restaurant != null ? (
        <div
          className="card mb-3 col-2"
          style={{
            width: "60%",
            margin: "0px auto",
            marginTop: "50px",
            border: "none",
          }}
        >
          <div
            onClick={() => {
              navigate(`/menu/${restaurant.name}/${restaurant.id}`);
            }}
            className="row g-0"
          >
            <div className="col-md-2">
              <img
                className="res-img"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.cloudinaryImageId}`}
                alt="..."
              />
            </div>
            <div className="col-md-8 res-details">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <span style={{ display: "flex" }}>
                  {" "}
                  <i className="fa-solid fa-star rating-icon"></i>
                  <p className="res-info">{restaurant.avgRating}</p>{" "}
                  <p className="res-info">{restaurant.sla.slaString}</p>{" "}
                  <p className="res-info">{restaurant.costForTwo}</p>
                </span>
                <p className="cuisines">
                  {restaurant.cuisines.slice(0, 3).join(",")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {similarRestaurants?.length > 0 ? (
        <>
          {" "}
          <h3 style={{ marginLeft: "320px", marginTop: "none" }}>More results like this</h3>
          <div
            className="card mb-3 col-2"
            style={{
              width: "60%",
              margin: "0px auto",
             
              border: "none",
            }}
          >
            {similarRestaurants?.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/menu/${item.info.name}/${item.info.id}`);
                  }}
                  className="row g-0"
                >
                  <div className="col-md-2">
                    <img
                      className="res-img"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.info.cloudinaryImageId}`}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8 res-details">
                    <div className="card-body">
                      <h5 className="card-title">{item.info.name}</h5>
                      <span style={{ display: "flex" }}>
                        {" "}
                        <i className="fa-solid fa-star rating-icon"></i>
                        <p className="res-info">{item.info.avgRating}</p>{" "}
                        <p className="res-info">{item.info.sla.slaString}</p>{" "}
                        <p className="res-info">{item.info.costForTwo}</p>
                      </span>
                      <p className="cuisines">
                        {item.info.cuisines.slice(0, 3).join(",")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default SearchRestaurant;
