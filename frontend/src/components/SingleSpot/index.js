import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as spotActions from '../../store/spots'
import EditSpotForm from '../EditSpot';
import { deleteSpot } from '../../store/spots';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const spots = useSelector(state => state.spots);
  const spotsData = Object.values(spots);

  // console.log('DA USER-------------------', sessionUser.id)
  // console.log('DA SPOT-------------------', spotsData[0].userId);

  useEffect(() => {
    dispatch(spotActions.getOneSpot(id));
  }, [dispatch, id]);

  return (
    <>
      <div className='card'>
        {spotsData?.map((spot) => (
          <>
          <h1>{spot.name}</h1>
          <h4>From the {spot.series} series!</h4>
          <div className="individual_photos">
            <img src={spot.img1} alt={spot.name} className="individual-img" />
            <img src={spot.img2} alt={spot.name} className="individual-img" />
            <img src={spot.img3} alt={spot.name} className="individual-img" />
            <img src={spot.img4} alt={spot.name} className="individual-img" />
          </div>
      <div className="spot_description">
        <h2>Entire location hosted by {spot?.User?.username}</h2>
        <h3>Located at {spot.address}, {spot.city}, {spot.state}, {spot.country}</h3>
          <p>{spot.description}</p>
      </div>
          </>
          ))}
        {sessionUser?.id === spotsData[0]?.User?.id &&
          (<>
            <EditSpotForm spot={spots} hideForm={() => setShowEditForm(false)} />
            <>
            </>
          </>
          )
        }
      </div>
    </>
  )
}

export default SingleSpot;
