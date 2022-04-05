import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser';
import CreateSpotForm from '../CreateSpotForm';
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
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser />
      </div>
      </>
    );
  }

  return (
      <div className="header">
    <ul>
      <li>
        <NavLink exact to="/" className="header_icon"><img className="header_icon" src="https://pluspng.com/img-png/airbnb-logo-png-is-airbnb-safe-what-the-homestay-app-does-to-make-hosts-and-guests-secure-in-their-use-780.png" alt="header_logo" /></NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
            </div>
  );
}

export default Navigation;
