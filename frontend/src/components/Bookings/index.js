import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";
import * as bookingActions from '../../store/bookings';
import './bookings.css'

const Bookings = () => {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)
  const bookings = useSelector(state => state.bookings);
  const bookingsData = Object.values(bookings)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  useEffect(async() => {
    await dispatch(bookingActions.loadAllBookings(sessionUser.id))
  }, [dispatch, sessionUser.id])

  console.log('BOOKINGS', bookingsData)

  return (
    <>
    {loading ? (
        <div className="loading">
          <ClipLoader color={'#50E3C2'} loading={loading} size={150} />
        </div>

    ): (
      <>

      {bookingsData.length > 0 ? (

        <div className='booking_container'>
        {bookingsData.map(booking => (
          <ul>
        <li>

        <div className='booking_card'>
          <div className='booking_img'>
            <a href={`/spots/${booking.id}`}><img src={booking?.Spot?.img1} alt={booking?.Spot?.name} /></a>
          </div>
          <div>
              <span style={{fontWeight: 'bold'}}>{booking?.Spot?.name}</span>
            <br / >
            {moment(booking?.startDate).utc().format('MMMM Do YYYY')}
              &nbsp;to&nbsp;
            {moment(booking?.endDate).utc().format('MMMM Do YYYY')}
          </div>
          <div className='cancel_booking'>
            <button type='button' onClick={() => {
              dispatch(bookingActions.removeBooking(booking.id))
            }}>Cancel Booking?</button>
            </div>
          </div>
        </li>
      </ul>
    ))}
  </div>
  ) : (
    <h1 style={{textAlign:'center', marginTop: '250px'}}>Nothing booked yet. <br/> Take a look at one of our <a href={`/spots`}>VENUES</a></h1>
    )}
    </>
    )}
    </>
  )

}

export default Bookings;
