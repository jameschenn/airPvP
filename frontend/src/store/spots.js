import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE'
const UPDATE_ONE = 'spots/UPDATE_ONE'
const REMOVE_ONE = 'spots/REMOVE_ONE'
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS'

export const load = spots => ({
  type: LOAD,
  spots
})

export const addOneSpot = spot => ({
  type: ADD_ONE,
  spot
});

export const updateOneSpot = spot => ({
  type: UPDATE_ONE,
  spot
});

export const removeOneSpot = spotId => ({
  type: REMOVE_ONE,
  spotId
});

export const loadReviews = review => ({
  type: LOAD_REVIEWS,
  review
})

export const loadAllSpots = () => async dispatch => {
  const result = await csrfFetch('/api/spots');

  if(result.ok) {
    const spots = await result.json();
    dispatch(load(spots))
  }
}

export const getOneSpot = id => async dispatch => {
  const result = await csrfFetch(`/api/spots/${id}`);
  if(result.ok) {
    const spot = await result.json();
    dispatch(load([spot]));
  }
}

export const createSpot = payload => async dispatch => {
  const response = await csrfFetch('/api/spots/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const newSpot = await response.json();
    dispatch(addOneSpot(newSpot));
    return newSpot;
  }
};

export const editSpot = payload => async dispatch => {
  const response = await csrfFetch(`/api/spots/${+payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const newSpot = await response.json();
    dispatch(addOneSpot(newSpot));
    return newSpot;
  }
};

export const deleteSpot = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    dispatch(removeOneSpot(spotId))
  }
};

export const loadAllReviews = spotId => async dispatch => {
  console.log('HITS');
  const result = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (result.ok) {
    const reviews = await result.json();
    dispatch(loadReviews(reviews))
  }
}

const initialState = {
  spots: []
};

const spotReducer = (state = initialState, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    case LOAD:
      const allSpots = {};
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot
      });
      return {
        ...allSpots,
        ...state.spot,
      };
    // case LOAD_REVIEWS:
    //   const allReviews = {};
    //   action.review.forEach(review => {
    //     console.log('WHAT ARE YOU?!', review)
    //     allReviews[review.id] = review
    //     console.log('AFTER', allReviews);
    //   });
    //   return {
    //     ...allReviews,
    //     ...state.review,
    //   }
    case ADD_ONE:
      if(!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        };
        // const spotList = newState.list.map(id => newState[id]);
        // spotList.push(action.spot);
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot
        }
      }
      case UPDATE_ONE:
        return {
          ...state,
          [action.spot.id]: action.spot
        };
      case REMOVE_ONE:
        const newState = {...state};
        delete newState[action.spotId];
        return newState;
      default:
        return state;
  }
}


export default spotReducer;
