import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./restaurantMenu.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RestaurantMenu() {
  let params = useParams();
  let [menu, setMenu] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.379608000000015&lng=78.436249&restaurantId=${params.restaurantId}&catalog_qa=undefined&submitAction=ENTER`
      )
      .then((res) => {
        const fetchedMenu =
          res.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
            1
          );
        setMenu(fetchedMenu || []); // Provide a default empty array
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, [params.restaurantId]);

  return (
    <div style={{marginTop: "120px"}}>
      <h3>Restaurant Menu</h3>
      <div
        className="accordion accordion-menu"
        id="accordionPanelsStayOpenExample"
      >
        {menu?.map((item, i) => {
          
          const title = item?.card?.card?.title;
          const itemCards = item?.card?.card?.itemCards;

          if (!itemCards) return null; // Skip items without `itemCards`

          return (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${i}`}
                  aria-expanded="false"
                  aria-controls={`collapse${i}`}
                >
                  <b>
                    {title} - {itemCards?.length || 0}
                  </b>
                </button>
              </h2>
              <div
                id={`collapse${i}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {itemCards.map((menuItem, j) => {
                    const info = menuItem?.card?.info;

                    if (!info) return null; // Skip items without `info`

                    return (
                      <div
                        key={j}
                        className="card text-center mb-3"
                        style={{ width: "18rem", border: "none" }}
                      >
                        {/* veg or nov-veg */}
                        <div>
                          <p style={{ display: "flex", alignItems: "center" }}>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: info.isVeg ? "green" : "red",
                                borderRadius: "50%",
                              }}
                            ></div>
                            <b
                              style={{
                                fontSize: "20px",
                                marginLeft: "5px",
                                color: info.isVeg ? "green" : "red",
                              }}
                            >
                              {info.isVeg ? "Veg" : "Non-Veg"}
                            </b>
                          </p>

                          {/* food-name  */}
                          <h4
                            className="heading"
                            style={{
                              marginRight: "100px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {info.name}
                          </h4>

                          {/* food-price */}
                          <b className="price">
                            {" "}
                            ₹{" "}
                            {info.price ? (
                              info.price / 100
                            ) : (
                              <p
                                style={{
                                  whiteSpace: "nowrap",
                                  marginRight: "250px",
                                }}
                              >
                                Price Not Available
                              </p>
                            )}
                          </b>

                          {/* rating */}
                          {info.ratings?.aggregatedRating?.rating && (
                            <div
                              style={{
                                color:
                                  info.ratings.aggregatedRating.rating >= 4.2
                                    ? "green"
                                    : "yellow",
                              }}
                              className="itemRating"
                            >
                              <span>
                                <i className="fa-solid fa-star"></i>{" "}
                                {info.ratings.aggregatedRating.rating}{" "}
                                <span
                                  style={{ marginLeft: "5px", color: "gray" }}
                                >
                                  ({info.ratings.aggregatedRating.ratingCount})
                                </span>
                              </span>
                            </div>
                          )}

                          {/* food-image */}
                          <div className="item-thumbnail">
                            <img
                              className="itemImage"
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`}
                              alt={info.name}
                            />
                            <div>
                              <button
                                onClick={() => {
                                  toast("Item Added to Cart", {
                                    style: {
                                      color: "green",
                                    },
                                  });
                                  dispatch(
                                    addToCart({
                                      Name: info.name,
                                      Price: info.price / 100,
                                      Image: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`,
                                    })
                                  );
                                }}
                                className="cart-button"
                              >
                                {" "}
                                <b>Add to Cart</b>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default RestaurantMenu;
