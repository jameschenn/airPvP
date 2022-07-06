import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as bookingActions from '../../store/bookings'

const Bookings = () => {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)
  const bookings = useSelector(state => state.bookings);
  const bookingsData = Object.values(bookings)

  useEffect(async() => {
    await dispatch(bookingActions.loadAllBookings(sessionUser.id))
  }, [dispatch, sessionUser.id])

  console.log('BOOKINGS', bookingsData)

  return (
    <>
    {bookingsData.map(booking => (
      <ul>
        {booking.Spot.name}
      </ul>
    ))}
    </>
  )

}

export default Bookings;
