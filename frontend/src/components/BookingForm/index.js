import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as bookingActions from '../../store/bookings';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({spot}) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const spotsData = Object.values(spot);


  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let booking of spotsData[0].Bookings) {

      let now = (new Date()).setHours(0, 0, 0, 0)
      let dbStartDate = (new Date(booking?.startDate)).setHours(0, 0, 0, 0);
      // console.log('start', dbStartDate);
      let dbEndDate = (new Date(booking?.endDate))
      // .setHours(0, 0, 0, 0);

      // let dbEndDate = (new Date(booking?.endDate)).setHours(0, 0, 0, 0);
      console.log('end date', dbEndDate);

      //The start date is before current date
      if (startDate.setHours(0, 0, 0, 0) < now) {
        errors.push('This date has already passed')
        break
      }

      //Checks if any other booking dates have been reserved already for this date
      // if (startDate.setHours(0, 0, 0, 0) === dbStartDate) {
      //   console.log('first if')
      //   errors.push('These Dates are unavailable')
      //   break;
      // }
      //Checks if any dates in between the start and end dates selected
      if (dbEndDate <= endDate.setHours(0, 0, 0, 0) &&
          dbEndDate <= endDate.setHours(0, 0, 0, 0)) {
        console.log('string triggered')
        errors.push('These dates are unavailable')
        break;
      }
    }

    setErrors(errors)
    console.log('errors', errors)

    setHasSubmitted(true);

    if(errors.length > 0) return;


    const payload = {
      userId: sessionUser.id,
      spotId: spotsData[0].id,
      startDate,
      endDate,
    };
    let newBooking = await dispatch(bookingActions.addBooking(payload));
    if(newBooking) {
      history.push(`/bookings`);
    }
  }

  return (
    <div>
      <section>
        <form className="new_booking" onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
          <div className="error-div">
            {errors.length > 0 && errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default BookingForm;
