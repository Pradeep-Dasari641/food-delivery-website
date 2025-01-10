import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearMyCart } from "../Reducer";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  let dispatch = useDispatch();
  let cartItems = useSelector((state) => {
    return state.cartItems;
  });

  let totalPrice = cartItems.reduce((acc, item, i) => {
    return acc + item.Price;
  }, 0);

  return (
    <>
      <div style={{ marginTop: "150px" }} className="continer-fluide">
        <button
          className="clear-cart-btn"
          onClick={() => {
            dispatch(clearMyCart());
          }}
        >
          Clear Cart
        </button>
        <div className="col-3 bill">
          <h5 style={{ color: "rgb(1, 1, 52)" }}>Bill Details</h5>
          <div>
            <p className="bill-details">Cart Items: {cartItems.length}</p>
            <p className="bill-details">Total Price: {totalPrice}</p>
          </div>
        </div>
        <div className=" col-9 continer-fluid cart-container">
          {cartItems.map((item, i) => {
            return (
              <div className="cart-card">
                <div className="col-3 cart-image">
                  <img className="dis-cart-image" src={item.Image} />
                </div>

                <div className="col-5 cart-details">
                  <h5>{item.Name}</h5>
                  <b>&#8377;{item.Price}</b>
                  <br />
                  <button
                    className="cart-delete-btn"
                    onClick={() => {
                      dispatch(removeFromCart(i));
                      toast("Item Added to Cart", {
                        style: {
                          color: "red",
                        },
                      });
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
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

export default Cart;
