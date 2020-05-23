import React from 'react';

import DefaultLayout from 'layouts/DefaultLayout';
import Link from 'elements/atoms/Link';

const Home = () => {
  return (
    <DefaultLayout pageTitle="Home">
      <div className="container mx-auto pt-4">
        <ul>
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
            <Link to="/keyframes">Sequential animation</Link>
          </li>
          <li>
            <Link to="/slider">Delay</Link>
          </li>
          <li>
            <Link to="/slider">Variants</Link>
          </li>
          <li>
            <Link to="/slider">Slider</Link>
          </li>
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default Home;
