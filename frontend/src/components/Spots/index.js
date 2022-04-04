import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';
import './spots.css';

const SpotsBrowser = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots);

  const spotsData = Object.values(spots);
  console.log(spotsData);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);


  return (
    <main>
      <h1>Spot Listings</h1>
      <div>
        {spotsData.map((spot) => (
          <>
          <img src={spot.Images} alt={spot.name}/>
          <p>{spot.name}</p>
          <p>{spot.price} /night</p>
          </>
        ))}
      </div>
    </main>
  )
}

export default SpotsBrowser;
