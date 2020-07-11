import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'services/setup';

import 'styles/tailwind.css';
// import 'styles/debug.css';

import MoveProvider from 'flicky/utils/move/MoveProvider';
import Home from 'pages/Home';
import Grid from 'pages/Grid';
import Mount from 'pages/Mount';
import Slider from 'pages/Slider';
import Keyframes from 'pages/Keyframes';
import FromState from 'pages/FromState';
import Sequential from 'pages/Sequential';
import ImageTrail from 'pages/ImageTrail';
import PinnedHeader from 'pages/PinnedHeader';
import Notifications from 'pages/Notifications';
import BottomSheet from 'pages/BottomSheet';
import Variants from 'pages/Variants';
import AppleWatch from 'pages/AppleWatch';
import ChatBox from 'pages/ChatBox';
import InvertedScale from 'pages/InvertedScale';
import Tcdba from 'pages/Tcdba';
import Swap from 'pages/Swap';
import Morph from 'pages/Morph';
import DragDrop from 'pages/DragDrop';
import FlickMotion from 'pages/FlickMotion';
import Stuff from 'pages/Stuff';
import Stuff2 from 'pages/Stuff2';

function App() {
  return (
    <div className="min-h-screen font-sans antialiased text-brand-black bg-brand-gray-100">
      <MoveProvider>
        <Router>
          <Switch>
            {/* <Route exact path="/"> <Redirect to="/login" /> </Route> */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/stuff">
              <Stuff />
            </Route>
            <Route exact path="/stuff2">
              <Stuff2 />
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
            <Route exact path="/sequential">
              <Sequential />
            </Route>
            <Route exact path="/trail">
              <ImageTrail />
            </Route>
            <Route exact path="/pinned-header">
              <PinnedHeader />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/variants">
              <Variants />
            </Route>
            <Route exact path="/apple-watch">
              <AppleWatch />
            </Route>
            <Route exact path="/bottom-sheet">
              <BottomSheet />
            </Route>
            <Route exact path="/chatbox">
              <ChatBox />
            </Route>
            <Route exact path="/invr-scale">
              <InvertedScale />
            </Route>
            <Route exact path="/tcdba">
              <Tcdba />
            </Route>
            <Route exact path="/swap">
              <Swap />
            </Route>
            <Route exact path="/morph">
              <Morph />
            </Route>
            <Route exact path="/drag-drop">
              <DragDrop />
            </Route>
            <Route exact path="/flick">
              <FlickMotion />
            </Route>
            <Route exact path="/grid">
              <Grid />
            </Route>
            <Route path="*">
              <h1>Not Found</h1>
            </Route>
          </Switch>
        </Router>
      </MoveProvider>
    </div>
  );
}

export default App;
