import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSpot, getOneSpot } from "../../store/spots";
import { deleteSpot } from '../../store/spots';
import { useParams } from "react-router";
import './EditSpot.css';


const EditSpotForm = ({spot, hideForm}) => {

  const spotData = Object.values(spot);
  const currentSpot = spotData[0]?.id;
  const sessionSpot = useSelector((state) => state.spots);
  const sessionUser = useSelector(state => state.session.user)
  const { id } = useParams();

  const [address, setAddress] = useState(sessionSpot[id]?.address || "");
  const [city, setCity] = useState(sessionSpot[id]?.city || "");
  const [state, setState] = useState(sessionSpot[id]?.state || "");
  const [country, setCountry] = useState(sessionSpot[id]?.country || "");
  const [series, setSeries] = useState(sessionSpot[id]?.series || "");
  const [name, setName] = useState(sessionSpot[id]?.name || "");
  const [description, setDescription] = useState(sessionSpot[id]?.description || "");
  const [price, setPrice] = useState(sessionSpot[id]?.price || "");
  // const [img1, setImg1] = useState(sessionSpot[id]?.img1 || "");
  // const [img2, setImg2] = useState(sessionSpot[id]?.img2 || "");
  // const [img3, setImg3] = useState(sessionSpot[id]?.img3 || "");
  // const [img4, setImg4] = useState(sessionSpot[id]?.img4 || "");
  const [images, setImages] = useState(sessionSpot[id]?.images || [])


  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const sessionUser = useSelector((state) => state.session.user);
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
    // if (!(img1.match(url))) errors.push('Please enter a valid URL for your image');
    // if (!(img2.match(url))) errors.push('Please enter a valid URL for your image');
    // if (!(img3.match(url))) errors.push('Please enter a valid URL for your image');
    // if (!(img4.match(url))) errors.push('Please enter a valid URL for your image');
    setErrors(errors);

  }, [name, price, address, city, state, country, series, description])


  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if(errors.length > 0) return;

    const payload = {
      ...spot,
      userId: sessionUser.id,
      address,
      city,
      state,
      country,
      series,
      name,
      description,
      price,
      images,
      id: currentSpot
    };
    let editedSpot = await dispatch(editSpot(payload));
    // if(editedSpot) {
    //   hideForm();
    // }
  };


  const updateFiles = e => {
    const files = e.target.files
    setImages(files)
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    // hideForm();
    setShow(false);
  };

  return (
    <>
    <button type='button' onClick={() => setShow(!show)}>Edit</button>
    {show?
    <div className="form_container">
      <section>
        <form className="edit_spot" onSubmit={handleSubmit}>

              <div className='errorDiv'>
                <ul className='errors'>

                  {hasSubmitted && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
          <div className="edit-row">

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
          </div>
          <div className="edit-row">

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
          </div>
          <div className="form_buttons">
            <div className="image-upload-div">
              <label className="image-upload">
                Images (Please upload 4)
              {/* <input
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
              /> */}
              <input
                className='formItem'
                type='file'
                multiple
                onChange={updateFiles}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
              <button onClick={() => {
                dispatch(deleteSpot(id))
                history.push('/spots')
              }}>Delete</button>
          </div>
        </form>
      </section>
    </div>:null}
    </>
  );
};

export default EditSpotForm;
