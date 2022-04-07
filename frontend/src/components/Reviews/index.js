import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as reviewActions from '../../store/reviews';

const SpotReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spot);
  const spotsData = Object.values(spots);

  console.log('sessionUser', sessionUser);
  console.log('spotsData; spotsData);

  const [errors, setErrors] = useState(false);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
}
