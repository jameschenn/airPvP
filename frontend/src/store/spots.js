const LOAD = 'chairs/LOAD'

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
