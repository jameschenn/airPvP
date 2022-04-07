import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';

const CreateSpotForm = () => {

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [series, setSeries] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  //image regex
  const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  useEffect(() => {
    const errors = [];

    if (name.length > 50 || name.length < 1) errors.push('Name must be between 1 and 50 characters long');
    if (price > 1000 || price < 100) errors.push('Please enter a valid price between $100 - $1000');
    if (address.length > 50 || address.length < 1) errors.push('Please enter a valid address');
    if (city.length > 50 || city.length < 1) errors.push('Please enter a valid city');
    if (state.length > 50 || state.length < 2) errors.push('Please enter a valid state');
    if (country.length > 50 || country.length < 2) errors.push('Please enter a valid country');
    if (series.length > 50 || series.length < 1) errors.push('Please provide a valid series');
    if (description.length > 1000 || description.length < 1) errors.push('Please provide a description within 1000 characters');
    if (!(img1.match(url))) errors.push('Please enter a valid URL for your image');
    if (!(img2.match(url))) errors.push('Please enter a valid URL for your image');
    if (!(img3.match(url))) errors.push('Please enter a valid URL for your image');
    if (!(img4.match(url))) errors.push('Please enter a valid URL for your image');
    setErrors(errors);

  }, [name, price, address, city, state, country, series, description, img1, img2, img3, img4])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      address,
      city,
      state,
      country,
      series,
      name,
      description,
      price,
      img1,
      img2,
      img3,
      img4,
    };

    let createdSpot = await dispatch(spotActions.createSpot(payload));
    let redirectId = Object.values(createdSpot)
    if(createdSpot) {
      history.push(`/spots/${redirectId[0].id}`);
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/spots`);
  };

  return (
    <div>
      <section>
        <form className="new_spot" onSubmit={handleSubmit}>
          <div className='errorDiv'>
            <ul className='errors'>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <label>
            House Name
            <input
              type='text'
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Address
            <input
              type='text'
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type='text'
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type='text'
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              type='text'
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Series
            <input
              type='text'
              placeholder="Series"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <input
              type='text'
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price
            <input
              type='number'
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Main Image (Min. 4)
            <input
              type='text'
              placeholder="Main Image"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
              required
            />
          </label>
          <label>
            Additional Image
            <input
              type='text'
              placeholder="Additional Image"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
              required
            />
          </label>
          <label>
            Additional Image
            <input
              type='text'
              placeholder="Additional Image"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
              required
            />
          </label>
          <label>
            Additional Image
            <input
              type='text'
              placeholder="Additional Image"
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={errors.length > 0}>Submit</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </div>
  );
};

export default CreateSpotForm;
