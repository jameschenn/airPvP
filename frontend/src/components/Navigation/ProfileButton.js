import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} className='profileButton'>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li style={{borderBottom:'solid 1px lightgray'}}> Hello <span style={{fontWeight:'bold', marginLeft:'5px'}}>{user.username}</span>!</li>
          {/* <li>{user.email}</li> */}
          <li><NavLink exact to="/spots/new">Add a new Listing</NavLink></li>
          <li><NavLink exact to="/bookings">Check Bookings</NavLink></li>
          <button onClick={logout} style={{marginBottom:'10px', marginTop:'10px', marginRight:'50px'}}>Log Out</button>
        </ul>

      )}
    </>
  );
}

export default ProfileButton;
