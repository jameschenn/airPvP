import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './DemoUser.css'


function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    return dispatch(sessionActions.demoUser({credential: 'Demo_User', password:'password'}))
  }
  return (
    <div id='demo'>
      <form onSubmit={handleSubmit}>
        <button className='demo-button' type='submit'>Demo User</button>
      </form>
    </div>
  );
}

export default DemoUser;
