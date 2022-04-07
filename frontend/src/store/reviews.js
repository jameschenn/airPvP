import { csrfFetch } from "./csrf";

const ADD_REVIEW = 'reviews/ADD_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

export const addOneReview = review => ({
  type: ADD_REVIEW,
  review
})

export const removeOneReview = (reviewId, spotId) => ({
  type: REMOVE_REVIEW,
  reviewId,
  spotId
})


const initialState = {
  reviews: []
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      default:
        return state;
  }
}

export default reviewsReducer;
