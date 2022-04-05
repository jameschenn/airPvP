import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';
import './spots.css';

const SpotsBrowser = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots);

  const spotsData = Object.values(spots);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);

  return (
    <main>
      <h1>Spot Listings</h1>
      <div>
        <div className="spot_cards">
          {spotsData?.map((spot) => (
            <>
              <a href={`/spots/${spot.id}`}>
                {spot.Images?.map(image => {
                  console.log(image);
                  return <img src={image.url} alt={spot.name} className="card-img" />
                })
                }
                <p>{spot.name}</p>
                <p>{spot.price} /night</p>
              </a>
            </>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SpotsBrowser;
