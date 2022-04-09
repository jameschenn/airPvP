import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editReview } from "../../store/reviews";
import { deleteSpot } from '../../store/spots';
import { useParams } from "react-router";

const EditReviewForm = ({reviews, hideForm}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const reviewData = Object.values(reviews);

  const { id } = useParams();

  const [errors, setErrors] = useState(false);
  const [review, setReview] = useState(reviews?.review || '');
  const [rating, setRating] = useState(reviews?.rating || 1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const errors = [];

    if (review.length <= 0) errors.push("Please leave a review since you\'re here already");
    if (rating > 5 || rating < 1) errors.push("Rating must be between 1 and 5");

    setErrors(errors);
  }, [review, rating])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setHasSubmitted(true);

    if(errors.length > 0) return;

    const payload = {
      ...reviews,
      review,
      rating,
      spotId: reviews?.spotId,
      userId: reviews?.userId
    }
    let editedReview = await dispatch(editReview(payload));

  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <>
    <button type='button' onClick={() => setShow(!show)}>Edit</button>
    {show?
    <div>
      <section>
        <form className="edit_review" onSubmit={handleSubmit}>
          <ul>
            {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Edit you Review
            <input
              type='text'
              placeholder='Leave a review'
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <label>
            Edit your rating
            <input
              type='number'
              placeholder='Leave a rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
              <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </div>:null}
    </>
  )
}

export default EditReviewForm;
