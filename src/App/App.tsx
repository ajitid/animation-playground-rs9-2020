import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'services/setup';

import 'styles/tailwind.css';
// import 'styles/debug.css';

import Home from 'pages/Home';
import Mount from 'pages/Mount';
import Slider from 'pages/Slider';
import Keyframes from 'pages/Keyframes';
import FromState from 'pages/FromState';

function App() {
  return (
    <div className="min-h-screen font-sans antialiased text-brand-black bg-brand-gray-100">
      <Router>
        <Switch>
          {/* <Route exact path="/"> <Redirect to="/login" /> </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mount">
            <Mount />
          </Route>
          <Route exact path="/slider">
            <Slider />
          </Route>
          <Route exact path="/keyframes">
            <Keyframes />
          </Route>
          <Route exact path="/from-state">
            <FromState />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
