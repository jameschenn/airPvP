import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser';
import CreateSpotForm from '../CreateSpotForm';
import logo from '../../images/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className="header_right">
        <LoginFormModal />
        <NavLink to="/signup"><button className ='signup_button'>Sign Up</button></NavLink>
        <DemoUser />
      </div>
      </>
    );
  }

  return (
    <div className="header">
      <ul>
        <li>
          <NavLink exact to="/" className="header_icon"><img className="header_icon" src={logo} alt="header_logo" /></NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
        <NavLink exact to="/spots/new" className="add_listing">Add a new Listing</NavLink>
    </div>
  );
}

export default Navigation;
