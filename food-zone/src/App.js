import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/header";
import Home from "./components/Home"
import RestaurantMenu from "./components/RestaurantMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SearchRestaurant from "./components/search-resturants";
import SearchDish from "./components/search-dish";
import Cart from "./components/Cart";



const App = () => {

  return(
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu/:restaurantName/:restaurantId" element={<RestaurantMenu />} />
      <Route path="/search-resturants" element={<SearchRestaurant />} />
      <Route path="/search-dish" element={<SearchDish />} />
      <Route path="/Cart" element={<Cart />}/>
      <Route path="*" element={<h3 style={{textAlign: "center", marginTop: "40px"}}>404 Page not Found!</h3>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App