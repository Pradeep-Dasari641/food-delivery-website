import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"
import { useSelector } from 'react-redux'



function Header() {

 let cartItems = useSelector( (state) => {
    return state.cartItems
  })

  return (
    <>
    <div id="header">
       <Link to="/"><img className="logo" src="https://tse4.mm.bing.net/th?id=OIP.06vjnJ7_UN522uxuD0jD2AHaHa&pid=Api&P=0&h=180" /> </Link>
       <Link className='searchRes-Dish' to="/search-dish"><i className="fa-solid fa-magnifying-glass" style={{marginRight: "5px"}}></i> Search Dishes</Link>
       <Link to="/search-resturants" className='searchRes-Dish'><i className="fa-solid fa-magnifying-glass" style={{marginRight: "5px"}}></i>search restaurant</Link>
       <div>
       <Link to="/Cart"><i style={{position: "relative",fontSize: "30px", color: "orange"}} className="fa-solid fa-bowl-food"></i>
      {cartItems.length > 0 && (
        <span
          style={{
            position: "absolute",
            background: "green",
            color: "white",
            borderRadius: "50px",
            padding: "5px 8px",
            fontSize: "12px",
            fontWeight: "bold",
            marginTop: "15px"
          }}
        >
          {cartItems.length}
        </span>
      )}</Link>
       </div>
    </div>
    </>
    
  )
}

export default Header