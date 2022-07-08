import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser';
import CreateSpotForm from '../CreateSpotForm';
import logo from '../../images/logo.png'
import * as searchAction from '../../store/search';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [searchContent, setSearchContent] = useState('')

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

  //Search Bar Stuff
  const handleSubmit = e => {
    e.preventDefault();
    history.push('/spots');
    const payload = {
      searchParams: searchContent
    }
    dispatch(searchAction.searchThunk(payload))
    setSearchContent('')
  }

  return (
    <div className="header">
      <div>
        <NavLink exact to="/" className="header_icon"><img className="header_icon" src={logo} alt="header_logo" /></NavLink>
      </div>

      <div className='searchbar'>
        <form onSubmit={handleSubmit}>
          <input
            className='formItem'
            type='text'
            value={searchContent}
            placeholder='Search for venues...'
            onChange={e => setSearchContent(e.target.value)}
          />
        </form>
      </div>



      <div className='nav_profile_button'>
          {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
