import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SpotsBrowser from './components/Spots'
import SingleSpot from './components/SingleSpot'
import CreateSpotForm from "./components/CreateSpotForm";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/spots'>
            <SpotsBrowser />
          </Route>
          <Route path='/spots/:id'>
            <SingleSpot />
          </Route>
          <Route exact path='/spots/new'>
            <CreateSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
