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
  console.log('test----------', spotsData);

  useEffect(() => {
    dispatch(spotActions.getOneSpot(id))
  }, [dispatch, id]);

  return (
    <main>
      <h1>Spot Listings</h1>
      <div>
        <div className="spot_cards">
          {spotsData?.map((spot) => (
            <>
              {spot.Images?.map((image, i) => {
                console.log(image);
                return <img src={image.url} alt={spot.name} key={i} className="card-img" />
              })
              }
              <p>{spot.name}</p>
              <p>{spot.price} /night</p>
            </>
          ))}
        </div>
      </div>
    </main>
  )

}

export default SingleSpot;
