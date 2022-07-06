import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
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
  const spotsData = Object.values(spot)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
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
        <form className="new_booking" onSubmit={handleSubmit}>
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
