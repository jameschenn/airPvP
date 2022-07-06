import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD'
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'

export const load = bookings => ({
  type: LOAD,
  bookings
});

export const removeOneBooking = bookingId => ({
  type: REMOVE_BOOKING,
  bookingId
});

export const loadAllBookings = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`);
  if(response.ok) {
    const bookings = await response.json();
    dispatch(load(bookings))
  }
}

export const removeBooking = bookingId => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  if(response.ok) {
    dispatch(removeOneBooking(bookingId))
  }
};

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
      case REMOVE_BOOKING:
        const newState = { ...state };
        delete newState[action.bookingId];
        return newState;
      default:
        return state;
  }
}

export default bookingsReducer;
