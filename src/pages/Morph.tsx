import React, { useState } from 'react';
import { a as ani, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const Morph = () => {
  const [big, setBig] = useState(false);
  const bigStyles = useSpring({ fontSize: big ? 64 : 16 });

  return (
    <DefaultLayout pageTitle="Morph">
      <div className="container mx-auto pt-4">
        <p className="mb-6 text-gray-600 leading-tight">
          Conditionally changed `to` on the basis of a state. Cool, eh?
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

export default Morph;
