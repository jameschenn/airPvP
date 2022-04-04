import React from "react";
import { NavLink } from "react-router-dom";
import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
      <div className='banner_info'>
        <h1>I'm the banner img :D</h1>
        <button className="banner_button"><a href="/spots">I'm Flexible</a></button>
      </div>

    </div>
  )
}

export default Banner
