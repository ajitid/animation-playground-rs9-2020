import React from 'react';

import DefaultLayout from 'layouts/DefaultLayout';
import Link from 'elements/atoms/Link';

const Home = () => {
  return (
    <DefaultLayout pageTitle="Home">
      <div className="container mx-auto pt-4">
        <ul>
          <li>
            <Link to="/stuff">Stuff</Link>
          </li>
          <li>
            <Link to="/stuff2">Stuff 2</Link>
          </li>
          <li>
            <Link to="/mount">Mount</Link>
          </li>
          <li>
            <Link to="/slider">Slider</Link>
          </li>
          <li>
            <Link to="/keyframes">Keyframes</Link>
          </li>
          <li>
            <Link to="/from-state">From state</Link>
          </li>
          <li>
            <Link to="/sequential">Sequential animation</Link>
          </li>
          <li>
            <Link to="/trail">[FIXME] Image trail</Link>
          </li>
          <li>
            <Link to="/pinned-header">Pinned header</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/variants">Variants</Link>
          </li>
          <li>
            <Link to="/apple-watch">[To-do] Apple Watch</Link>
          </li>
          <li>
            <Link to="/bottom-sheet">[To-do] Bottom sheet</Link>
          </li>
          <li>
            <Link to="/chatbox">Chat box</Link>
          </li>
          <li>
            <Link to="/invr-scale">Inverted scale</Link>
          </li>
          <li>
            <Link to="/tcdba">Three cards drag, blur animation</Link>
          </li>
          <li>
            <Link to="/swap">[To-do] Swap</Link>
          </li>
          <li>
            <Link to="/morph">[To-do] Morph</Link>
          </li>
          <li>
            <Link to="/inverse-decay">[To-do] Speed inverse-decay list transition</Link>
          </li>
          <li>
            <Link to="/drag-drop">[To-do] Drag and drop</Link>
          </li>
          <li>
            <Link to="/flick">Flick motion</Link>
          </li>
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default Home;
