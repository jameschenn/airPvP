import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSpot, getOneSpot } from "../../store/spots";
import { deleteSpot } from '../../store/spots';
import { useParams } from "react-router";


const EditSpotForm = ({spot, hideForm}) => {

  const spotData = Object.values(spot);
  const currentSpot = spotData[0]?.id;
  const sessionSpot = useSelector((state) => state.spots);

  const { id } = useParams();
  // console.log('Spot\'s info', sessionSpot[id]);

  const [address, setAddress] = useState(sessionSpot[id].address || "");
  const [city, setCity] = useState(sessionSpot[id].city || "");
  const [state, setState] = useState(sessionSpot[id].state || "");
  const [country, setCountry] = useState(sessionSpot[id].country || "");
  const [series, setSeries] = useState(sessionSpot[id].series || "");
  const [name, setName] = useState(sessionSpot[id].name || "");
  const [description, setDescription] = useState(sessionSpot[id].description || "");
  const [price, setPrice] = useState(sessionSpot[id].price || "");
  const [img1, setImg1] = useState(sessionSpot[id].img1 || "");
  const [img2, setImg2] = useState(sessionSpot[id].img2 || "");
  const [img3, setImg3] = useState(sessionSpot[id].img3 || "");
  const [img4, setImg4] = useState(sessionSpot[id].img4 || "");

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  // const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...spot,
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
      id: currentSpot
    };

    let editedSpot = await dispatch(editSpot(payload));
    // if(editedSpot) {
    //   hideForm();
    // }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // hideForm();
    setShow(false);
  };

  return (
    <>
    <button type='button' onClick={() => setShow(!show)}>Edit</button>
    {show?
    <div>
      <section>
        <form className="edit_spot" onSubmit={handleSubmit}>
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
              <button onClick={() => {
                dispatch(deleteSpot(id))
                history.push('/spots')
              }}>Delete</button>
        </form>
      </section>
    </div>:null}
    </>
  );
};

export default EditSpotForm;
