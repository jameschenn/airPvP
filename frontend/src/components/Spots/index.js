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
    <>
      <div className= 'card'>
        {spotsData?.map((spot) => (
          <>
            <a href={`/spots/${spot.id}`}>
            <img src={spot.img1} alt={spot.name} className="card-img"/>
          <p>{spot.name}</p>
          <p>{spot.price} /night</p>
        </a>
          </>
        ))}
      </div>
    </>
  )
}

export default SpotsBrowser;
