import { csrfFetch } from "./csrf";

const SEARCH = 'search/SEARCH'
const CLEAR = 'search/CLEAR'

export const search = search => ({
  type: SEARCH,
  search
});

export const clear = () => ({
  type:CLEAR
})

export const clearThunk = () => dispatch => {
  dispatch(clear())
}

export const searchThunk = searchParam => async dispatch => {
  const result = await csrfFetch(`/api/spots/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParam)
  });
  if(result.ok) {
    const spots = await result.json();
    dispatch(clear())
    dispatch(search(spots))
  }
}

const initialState = {}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH:
      const searchResults = {}
      action.search.forEach(results => {
        searchResults[results.id] = results
      });
      return {
        ...state,
        ...searchResults
      }
      case CLEAR:
        return {};
      default:
        return state;
  }
}

export default searchReducer
