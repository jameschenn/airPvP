import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';
import '../Spots/spots.css';

const SearchResults = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);

  const spots = useSelector(state => state.spots);
  const spotsData = Object.values(spots);
  const searches = useSelector(state => state.search)
  const searchData = Object.values(searches);

  const random = spot => {
    const randomNum = Math.floor(Math.random() * spotsData.length);

    return spotsData[randomNum];
  }

  const randomSpotsArr = [];
  for(let i = 0; i < 4; i++) {
    const randomSpot = random(spots);
    randomSpotsArr.push(randomSpot);
  }

  return (
    <>
      {searchData.length > 0 ? (
        <div className='spot_container'>
          {searchData?.map((spot) => (
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
          ))}
        </div>
      ) : (
         <>
         <h2 style={{ textAlign: 'center', marginTop:'100px' }}>No Results found. Check out one of these venues instead ⚔️</h2>
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
            ))}
          </div>
          </>
      )}
    </>
  )
}

export default SearchResults;
