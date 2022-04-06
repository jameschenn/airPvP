import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import * as spotActions from '../../store/spots'
import EditSpotForm from '../EditSpot';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots);
  const thisSpot = Object.values(spot);
  // console.log('this spot--------------', thisSpot);

  const [showEditForm, setShowEditForm] = useState(false);

  const spots = useSelector(state => state.spots);
  const spotsData = Object.values(spots);

  useEffect(() => {
    setShowEditForm(false);
    dispatch(spotActions.getOneSpot(id))
  }, [dispatch, id]);

  let content = null;

  if(showEditForm) {
    content = (
      <>
        <EditSpotForm spot={spot} hideForm={() => setShowEditForm(false)}/>
      </>
    )
  }

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
