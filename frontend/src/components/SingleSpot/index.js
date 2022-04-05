import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import * as spotActions from '../../store/spots'
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const spots = useSelector(state => state.spots);
  const spotsData = Object.values(spots);
  // console.log('test----------', spotsData);

  useEffect(() => {
    dispatch(spotActions.getOneSpot(id))
  }, [dispatch, id]);

  return (
    <>
      <div className='card'>
        {spotsData?.map((spot) => (
          <>
            <img src={spot.img1} alt={spot.name} className="card-img" />
            <img src={spot.img2} alt={spot.name} className="card-img" />
            <img src={spot.img3} alt={spot.name} className="card-img" />
            <img src={spot.img4} alt={spot.name} className="card-img" />
      <div className="spot_description">
          <p>{spot.name}</p>
          <p>{spot.description}</p>
      </div>
          </>
          ))}
      </div>
    </>
  )
}

export default SingleSpot;
