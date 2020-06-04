import React, { useState } from 'react';
import { a as ani, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';
import Heya from './Heya';

const Swap = () => {
  const [show, setShow] = useState(false);
  const bigStyles = useSpring(() => ({ fontSize: show ? 64 : 16 }));

  return (
    <DefaultLayout pageTitle="Swap">
      <div className="container mx-auto pt-4">
        <Button onClick={() => setShow(s => !s)}>Swap</Button>
        <div>
          {show && <ani.div className="inline-block w-32 h-32 bg-green-300" />}
          {!show && <ani.div className="inline-block w-16 h-16 bg-pink-300 rounded-full" />}
        </div>
      </div>
      {show && <Heya />}
    </DefaultLayout>
  );
};

export default Swap;
