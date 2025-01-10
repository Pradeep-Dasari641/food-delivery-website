import React, { useState, useEffect } from "react";
import "./searchDish.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchDish() {
  let [dishName, setDishName] = useState("");
  let [dishes, setDishes] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.379608000000015&lng=78.436249&str=${dishName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=531306dc-a1ec-0227-0fb3-ebb36bd6cf7a&`
      )
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
          setDishes(
            res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards.splice(
              1
            )
          );
        }
      });
  }, [dishName]);

  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <div className="search-dish-bar">
          <input
            value={dishName}
            onChange={(e) => {
              setDishName(e.target.value);
            }}
            className="input-dish"
            placeholder="Search for Food"
          />
          <i className="fa-solid fa-magnifying-glass searchMag"></i>
        </div>
      </div>

      <div className="dishCont">
        <div className="row row-cols-2 ">
          {dishes.map((item, i) => {
            return (
              <div
                style={{ backgroundColor: "rgb(245, 238, 238)" }}
                className="col"
              >
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <b>{item?.card?.card?.restaurant?.info?.name}</b>
                    </p>
                    <span style={{ display: "flex" }}>
                      {" "}
                      <i className="fa-solid fa-star rating-icon"></i>
                      <p className="card-text">
                        {item?.card?.card?.restaurant?.info?.avgRating}
                      </p>{" "}
                      <p className="card-text">
                        {item?.card?.card?.restaurant?.info?.sla?.slaString}
                      </p>
                      <i
                        onClick={() => {
                          navigate(
                            `/menu/${item?.card?.card?.restaurant?.info?.name}/${item?.card?.card?.restaurant?.info?.id}`
                          );
                        }}
                        style={{ marginLeft: "250px", fontSize: "20px" }}
                        className="fa-solid fa-arrow-right"
                      ></i>
                    </span>

                    <hr className="dotted-line"></hr>

                    <div className="continer-fluid details-card">
                      <div className="col-6 dish-card">
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              width: "15px",
                              height: "15px",
                              backgroundColor: item?.card?.card?.info?.isVeg
                                ? "green"
                                : "red",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <b
                            style={{
                              fontSize: "15px",
                              marginLeft: "5px",
                              color: item?.card?.card?.info?.isVeg
                                ? "green"
                                : "red",
                            }}
                          >
                            {item?.card?.card?.info?.isVeg ? "Veg" : "Non-Veg"}
                          </b>
                        </p>
                        <h4>{item?.card?.card?.info?.name}</h4>
                        <h5>&#8377;{item?.card?.card?.info?.price / 100}</h5>
                      </div>
                      <div className="col-6 dish-image">
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.card?.card?.info?.imageId}`}
                          className="card-img-top image"
                          alt="..."
                        />
                        <button
                          onClick={() => {
                            toast("Item Added to Cart", {
                              style: {
                                color: "green",
                              },
                            });
                            dispatch(
                              addToCart({
                                Name: item?.card?.card?.info?.name,
                                Price: item?.card?.card?.info?.price / 100,
                                Image: `https://media-assets.swiggy.com/swiggy/image/upload/${item?.card?.card?.info?.imageId}`,
                              })
                            );
                          }}
                          id="add-button"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SearchDish;
