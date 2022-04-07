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
  // const spotsData = Object.values(spots);

  const [errors, setErrors] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      spotId: spots[id].id,
      review,
      rating,
    }

    let createdReview = await dispatch(reviewActions.addReview(payload, spots[id].id));
  }


  return (
    <div>
      <section>
        <form className="new_review" onSubmit={handleSubmit}>
          <label>
            How was it? Leave A Review
            <input
              type='text'
              placeholder='Leave a review'
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="one">1</option>
            <option value="two">2</option>
            <option value="three">3</option>
            <option value="four">4</option>
            <option value="five">5</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default SpotReviews;
