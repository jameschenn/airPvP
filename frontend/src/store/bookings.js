import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD'
const ADD_BOOKING = 'booking/ADD_BOOKING'
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING'

const CLEAR_STORE = 'images/CLEAR_STORE';

const clearStore = () => ({
  type: CLEAR_STORE
})

export const load = bookings => ({
  type: LOAD,
  bookings
});

export const addOneBooking = booking => ({
  type: ADD_BOOKING,
  booking
})

export const removeOneBooking = bookingId => ({
  type: REMOVE_BOOKING,
  bookingId
});

export const clearStoreThunk = () => async dispatch => {
  dispatch(clearStore())
}

export const loadAllBookings = (id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`);
  if(response.ok) {
    const bookings = await response.json();
    dispatch(load(bookings))
  }
}

export const addBooking = payload  => async dispatch => {
  const response = await csrfFetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(response.ok) {
    const booking = await response.json();
    dispatch(addOneBooking(booking));
    return booking;
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
      action.bookings.forEach(booking => {
        allBookings[booking.id] = booking
      });
      return {
        ...state,
        ...allBookings
      };
      case ADD_BOOKING:
        const newBooking = {
          ...state,
          [action.booking.id]: action.booking
        }
        return newBooking;
      // case ADD_BOOKING:
      //   if(!state[action.booking.id]) {
      //     const newBooking = {
      //       ...state,
      //       [action.booking.id]: action.booking
      //     }
      //     return newBooking
      //   } return {
      //     ...state,
      //     [action.booking.id]: {
      //       ...state[action.booking.id],
      //       ...action.booking
      //     }
      //   }
      case REMOVE_BOOKING:
        const newState = { ...state };
        delete newState[action.bookingId];
        return newState;
      case CLEAR_STORE:
        return {}
      default:
        return state;
  }
}

export default bookingsReducer;
