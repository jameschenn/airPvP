import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import moment from 'moment';
import * as bookingActions from '../../store/bookings';
import './bookings.css'

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
  <div className='booking_container'>
    {bookingsData.map(booking => (
      <ul>
        <li>

        <div className='booking_card'>
          <div className='booking_img'>
            <img src={booking?.Spot?.img1} alt={booking?.Spot?.name} />
          </div>
          <div>
            {booking?.Spot?.name}
            <br / >
            {moment(booking?.startDate).utc().format('MMMM Do YYYY')}
              &nbsp; to &nbsp;
            {moment(booking?.endDate).utc().format('MMMM Do YYYY')}
          </div>
          <div>
            <button type='button' onClick={() => {
              dispatch(bookingActions.removeBooking(booking.id))
            }}>Cancel Booking?</button>
            </div>
          </div>
        </li>
      </ul>
    ))}
  </div>
    </>
  )

}

export default Bookings;
