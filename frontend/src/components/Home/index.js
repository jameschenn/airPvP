import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import Banner from './Banner'
import './Home.css'


function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spotActions.loadAllSpots());
  }, [dispatch])

  const spots = useSelector(state => state.spots);
  const spotsData = Object.values(spots);

  const random = spot => {
    const randomNum = Math.floor(Math.random() * spotsData.length);

    return spotsData[randomNum];
  }

  const randomSpotsArr = [];
  for(let i = 0; i < 3; i++) {
    const randomSpot = random(spots);
    randomSpotsArr.push(randomSpot);
  }

  return (
    <>
    <div className='home'>
      <Banner />
    </div>
      <h2 style={{ textAlign: 'center' }}>Check out one of these venues ⚔️</h2>
    <div className='random_container'>
      {randomSpotsArr.map(spot => (
        <ul>
          <li>
            <div className='spot_card'>
              <div className='booking_img'>
                <a href={`/spots/${spot.id}`}><img src={spot.img1} alt={spot.name} className="card-img" /></a>
              </div>
              <div className='spot_info'>
                <p style={{ fontWeight: 'bold' }}>{spot?.name}</p>
                <p>{spot?.series}</p>
                <p><span style={{ fontWeight: 'bold' }}>{spot?.price}</span> / night</p>
              </div>
            </div>
          </li>
        </ul>
      ) )}
    </div>
    </>
  )
}

export default Home
