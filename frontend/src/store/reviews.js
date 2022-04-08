import { csrfFetch } from "./csrf";

const ADD_REVIEW = 'reviews/ADD_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS'

export const addOneReview = review => ({
  type: ADD_REVIEW,
  review
})

export const removeOneReview = (reviewId, spotId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  spotId
})

export const updateOneReview = review => ({
  type: UPDATE_REVIEW,
  review
})

export const loadReviews = review => ({
  type: LOAD_REVIEWS,
  review
})

export const addReview = (review, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })
  if(response.ok) {
    const newReview = await response.json();
    dispatch(addOneReview(newReview));
    return newReview;
  }
}

export const deleteReview = reviewId => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    const id = await response.json()
    dispatch(removeOneReview(id));
    return id;
  }
}

export const editReview = payload => async dispatch => {
  console.log('IT ENTERS HERE')
  const response = await csrfFetch(`/api/reviews/${+payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  console.log('-------------------------', response);
  if(response.ok) {
    const newReview = await response.json();
    dispatch(updateOneReview(newReview));
    return newReview;
  }
}

export const loadAllReviews = spotId => async dispatch => {
  console.log('HITS1');
  const result = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (result.ok) {
    const reviews = await result.json();
    console.log('HITS2--------------', reviews)
    dispatch(loadReviews(reviews))
  }
}

const initialState = {
  reviews: []
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviews = {};
      action.review.forEach(review => {
        console.log('WHAT ARE YOU?!', review)
        allReviews[review.id] = review
        console.log('AFTER', allReviews);
      });
      return {
        ...allReviews,
        ...state.review,
      }
    case ADD_REVIEW:
      if(!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review
        }
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.review
        }
      }
      case UPDATE_REVIEW:
        return {
          ...state,
          [action.review.id]: action.review
        }
      case REMOVE_REVIEW:
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      default:
        return state;
  }
}

export default reviewsReducer;
