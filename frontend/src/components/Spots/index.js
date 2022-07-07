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
        {spotsData?.map((spot) => (
          <ul>
            <li>

              <div className='spot_card'>
                <div className='booking_img'>
                  <a href={`/spots/${spot.id}`}><img src={spot.img1} alt={spot.name} className="card-img" /></a>
                </div>
                    <div className='spot_info'>
                      <p style={{fontWeight:'bold'}}>{spot?.name}</p>
                      <p>{spot?.series}</p>
                  <p><span style={{fontWeight:'bold'}}>{spot?.price}</span> / night</p>
                    </div>

              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}

export default SpotsBrowser;
