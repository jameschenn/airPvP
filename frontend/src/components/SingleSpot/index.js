import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as spotActions from '../../store/spots'
import * as reviewActions from '../../store/reviews'
import EditSpotForm from '../EditSpot';
import SpotReviews from '../Reviews';
import { deleteReview } from '../../store/reviews';
import EditReviewForm from '../EditReview';
import BookingForm from '../BookingForm';
import LoginFormModal from '../LoginFormModal';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const spots = useSelector(state => state.spots);
  const reviews = useSelector(state => state.reviews);

  const spotsData = Object.values(spots);

  useEffect(() => {
    dispatch(reviewActions.loadAllReviews(id));
    dispatch(spotActions.getOneSpot(id));
  }, [dispatch, id]);

  useEffect(() => {
  setReviewsData(Object.values(reviews));

  }, [reviews])
  async function onClick(review) {
    await dispatch(deleteReview(review));
  }

  return (
    <>
      <div className='card'>
        {spotsData?.map((spot) => (
          <>
        <div className='listing_header'>
          <h2>{spot.name}</h2>
          <h4>From the {spot.series} series!</h4>
        </div>
          <div className="individual_photos">
            <div>
              <img src={spot.img1} alt={spot.name} className="individual-img" />
              <img src={spot.img2} alt={spot.name} className="individual-img" />
            </div>
            <div>
              <img src={spot.img3} alt={spot.name} className="individual-img" />
              <img src={spot.img4} alt={spot.name} className="individual-img" />
            </div>
          </div>
            <div className='info-container'>

              <div>

                <div className="spot_location">
                  <h3>Entire location hosted by {spot?.User?.username} at {spot.price} / night</h3>
                  <h4>Located at {spot.address}, {spot.city}, {spot.state}, {spot.country}</h4>
                </div>

                <div className='spot-description'>
                  <p>{spot.description}</p>
                  {sessionUser?.id === spotsData[0]?.User?.id &&
                    (<>
                      <EditSpotForm spot={spots} hideForm={() => setShowEditForm(false)} />
                      <>
                      </>
                    </>
                    )
                  }
                </div>
                </div>

                <div>
                  {/* Booking Calendar here */}
                  {sessionUser ? (
                    <div className='booking'>
                      <BookingForm spot={spots} />
                    </div>
                  ) : (
                    <div className='booking'>
                      <div className='booking-box'>
                        <h3>Please <LoginFormModal /><br /> or <a href={`/signUp`}><button>sign up</button></a><br /> to start booking</h3>
                      </div>
                    </div>
                  )}
                </div>

            </div>
          </>
        ))}

        <div className='spot_reviews'>
          <h2>{reviewsData?.length} Reviews</h2>
          {reviewsData?.map((review) => (
          <div className='individual_review'>
            <>
              <p><span style={{ fontWeight: "bold" }}>{review?.User?.username}</span> rated this location <span style={{ fontWeight: "bold" }}>{review?.rating} out of 5</span></p>
              <p>{review?.review}</p>
              {console.log('REVIEW', review)}
              {sessionUser?.id === review?.userId && (
                <>
                  <div style={{ marginLeft: '30px' }}>
                    <EditReviewForm reviews={review} />
                    <button type="button" style={{ marginLeft: '15px' }} onClick={() => {
                      onClick(review.id)
                    }}>Delete</button>
                  </div>
                </>
              )}
            </>
        </div>
          ))}
        <div className= 'review_form'>
          {sessionUser?.id && (
              <SpotReviews />
          )}
        </div>
      </div>
      </div>
    </>
  )
}

export default SingleSpot;
