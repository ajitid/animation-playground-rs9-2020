import React, { useState } from 'react';
import { a as ani, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const FromState = () => {
  const [big, setBig] = useState(false);
  const bigStyles = useSpring({ fontSize: big ? 64 : 16 });

  return (
    <DefaultLayout pageTitle="From state">
      <div className="container mx-auto">
        <p className="pt-4 pb-6">
          Conditionally changed `to` on the basis of state. Pretty powerful, huh?
        </p>
        <div className="mb-3">
          <Button onClick={() => setBig(b => !b)}>Toggle size</Button>
        </div>
        <ani.div style={bigStyles} className="inline-block">
          could be smol, could be big
        </ani.div>
      </div>
    </DefaultLayout>
  );
};

export default FromState;
