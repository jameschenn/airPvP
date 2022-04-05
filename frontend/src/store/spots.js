const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE'

export const load = spots => ({
  type: LOAD,
  spots
})

export const addOneSpot = spot => ({
  type: ADD_ONE,
  spot
});

export const loadAllSpots = () => async dispatch => {
  const result = await fetch('/api/spots');

  if(result.ok) {
    const spots = await result.json();
    dispatch(load(spots))
  }
}

export const getOneSpot = id => async dispatch => {
  const result = await fetch(`/api/spots/${id}`);
  if(result.ok) {
    const spot = await result.json();
    dispatch(load([spot]));
  }
}

export const createSpot = payload => async dispatch => {
  const response = await fetch('/api/spots', {
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

const initialState = {
  spots: []
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSpots = {};
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot
      });
      return {
        ...allSpots,
        ...state,
      };
    case ADD_ONE:
      if(!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        };
        const spotList = newState.list.map(id => newState[id]);
        spotList.push(action.spot);
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot
        }
      }
      default:
        return state;
  }
}


export default spotReducer;
