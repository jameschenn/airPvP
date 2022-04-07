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
    <>
      <div className='spot_container'>
        <div className='spot_card'>
          {spotsData?.map((spot) => (
            <>
              <a href={`/spots/${spot.id}`}>
              <img src={spot.img1} alt={spot.name} className="card-img"/>
                <div className='spot_info'>
                  <div className="spot_name">
                    <p>{spot.name}</p>
                  </div>
                  <div className="spot_price">
                    <p>{spot.price} /night</p>
                  </div>
              </div>
          </a>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default SpotsBrowser;
