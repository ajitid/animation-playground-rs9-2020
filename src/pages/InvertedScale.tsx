import React, { useState } from 'react';
import { a, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const InvertedScale = () => {
  const [big, setBig] = useState(false);
  const styles = useSpring({ scaleY: big ? 1.6 : 1 });

  return (
    <DefaultLayout pageTitle="Inverted scale">
      <div className="container mx-auto pt-4">
        <div className="mb-3">
          <Button onClick={() => setBig(b => !b)}>Toggle scale</Button>
        </div>
        <a.div
          style={{ ...styles, transformOrigin: '50% 0%' }}
          className="w-32 h-32 bg-gray-300"
        >
          {/* Instead of directly applying to `p` tag containing text, make a wrapper and invert scale there */}
          {/* 
            A similar need might occur to invert border radius
            referred to framer-motion docs, an invert for very small values can result in Infinity (lang math precision err)
            so its better to assume and use a max scale value instead 
          */}
          <a.div style={{ scaleY: styles.scaleY.to(v => (v > 0.01 ? 1 / v : 10000)) }}>
            <p>cmjnckfjv</p>
          </a.div>
          {/*
            framer-motion internally passes context value and so can receive and pump out inverted scale properties
            it might be possible to do so either
            - by making a wrapper over animated.
            - by looking at low level component that react spring gives
          */}
        </a.div>
      </div>
    </DefaultLayout>
  );
};

export default InvertedScale;
