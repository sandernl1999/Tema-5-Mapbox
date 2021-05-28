import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import GlobalStyle from './components/GlobalStyle';
import HomeContainer from './containers/HomeContainer';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Information from './components/Information';

function App() {

  useEffect(()=> {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/chart.js@3.1.0/dist/chart.min.js";
    script.async = true;

    document.body.appendChild(script);
    console.log("APP STARTED");
    console.log("MAPBOX VAR", process.env.MAPBOX_API_KEY);
    console.log("KAMAL VAR", process.env.KAMAL_VAR);


  })

  return (
    <>
      <GlobalStyle />
      <Information />
      <Router>
        <Switch>
          <Route path="/" component={HomeContainer} />
        </Switch>
        
      </Router>
    </>
  )
};



export default App;
