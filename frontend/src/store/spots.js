const LOAD = 'spots/LOAD'

export const load = spots => ({
  type: LOAD,
  spots
})

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
      }
      default:
        return state;
  }
}


export default spotReducer;
