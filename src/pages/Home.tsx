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
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default Home;
