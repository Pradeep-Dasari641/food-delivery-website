import React from 'react'
import axios from "axios";
import "./App.css"

function LocationSection({locationName,setLocationName,setLocationSuggestion,setTopRestaurants,setGeoLocation,locationSuggestions}) {
  return (
    <>
      <div className="col-2 location-section" style={{marginTop: "120px"}}>
            <input className="location-input"
            value={locationName}
            onChange={ (e) => {
              setLocationName(e.target.value)
            }}
             placeholder="Search for area, street name.." />

            <div>
            <ol style={{ marginTop: "50px"}}>
             { locationName != "" && locationName.length >= 3 ?  locationSuggestions.map( (item,i) => {
                return <li style={{position: "sticky"}} className="location-suggestions"
                   onClick={ () => {
                    setTopRestaurants([])
                   axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${item.place_id}`)
                   .then( (res) => {
                    setGeoLocation(res.data.data[0].geometry.location)
                    setLocationSuggestion([])
                   })
                }}> <i className="fa-solid fa-location-dot location-icon"></i>{item.description}</li>
              }) : ''}
             </ol>
            </div>
          </div>
    </>
  )
}

export default LocationSection