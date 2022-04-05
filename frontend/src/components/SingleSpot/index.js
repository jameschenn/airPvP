import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import * as spotActions from '../../store/spots'
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const spots = useSelector(state => state.chair);
console.log(spots);
  // const spotsData = Object.values(spots);
  // console.log(spotsData);
  useEffect(() => {
    dispatch(spotActions.getOneSpot(id))
  }, [dispatch, id]);

  return (
    <div>
      <h1>Test</h1>
    </div>
  )

}

export default SingleSpot;
