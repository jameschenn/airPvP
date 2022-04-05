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

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  // console.log('test----------', sessionUser)
  useEffect(() => {
    dispatch(spotActions.loadAllSpots())
  }, [dispatch])

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
            Main Image
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
            />
          </label>
          <label>
            Additional Image
            <input
              type='text'
              placeholder="Additional Image"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
            />
          </label>
          <label>
            Additional Image
            <input
              type='text'
              placeholder="Additional Image"
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      </section>
    </div>
  );
};

export default CreateSpotForm;
