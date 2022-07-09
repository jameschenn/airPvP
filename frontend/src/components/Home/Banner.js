import React from "react";
import { NavLink } from "react-router-dom";
import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
      <div className='banner_info'>
        <h1>Welcome to AirPvP</h1>
        <h2>Let's begin</h2>
        <NavLink to="/spots"><button className="banner_button">START</button></NavLink>
      </div>

    </div>
  )
}

export default Banner
