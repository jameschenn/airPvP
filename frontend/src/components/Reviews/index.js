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
  const spots = useSelector(state => state.spots);
  // console.log('DA SPOT----------', spots[id]);

  const [errors, setErrors] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if(review.length <= 0) errors.push("Please leave a review since you\'re here already");
    if(rating > 5 || rating < 1) errors.push("Rating must be between 1 and 5");

    setErrors(errors);
  }, [review, rating])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length > 0) return;

    const payload = {
      userId: sessionUser.id,
      spotId: spots[id].id,
      review,
      rating,
    }

    let createdReview = await dispatch(reviewActions.addReview(payload, spots[id].Reviews.id));

  }


  return (
    <div>
      <section>
        <form className="new_review" onSubmit={handleSubmit}>
          <ul>
            {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            How was it? Leave A Review
            <input
              type='text'
              placeholder='Leave a review'
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <label>
            Give it a rating between 1 through 5
            <input
              type='number'
              placeholder='Leave a rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default SpotReviews;
