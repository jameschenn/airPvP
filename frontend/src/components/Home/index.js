import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import Banner from './Banner'
import './Home.css'


function Home() {

  return (
    <div className='home'>
      <Banner />
    </div>
  )
}

export default Home
