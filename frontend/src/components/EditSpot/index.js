import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, getOneSpot } from "../../store/spots";

const editSpot = ({spot, hideForm}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [series, setSeries] = useState(spot.series);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [img1, setImg1] = useState(spot.img1);
  const [img2, setImg2] = useState(spot.img2 || '');
  const [img3, setImg3] = useState(spot.img3 || '');
  const [img4, setImg4] = useState(spot.img4 || '');

}
