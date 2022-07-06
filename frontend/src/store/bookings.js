import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD'

export const load = bookings => ({
  type: LOAD,
  bookings
});

export const loadAllBookings = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`);
  if(response.ok) {
    const bookings = await response.json();
    dispatch(load(bookings))
  }
}

const initialState = {}

const bookingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD:
      const allBookings = {};
      console.log('thunk', action)
      action.bookings.forEach(booking => {
        allBookings[booking.id] = booking
      });
      return {
        ...state,
        ...allBookings
      };
      default:
        return state;
  }
}

export default bookingsReducer;
