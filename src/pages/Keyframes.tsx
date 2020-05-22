import React, { useState } from 'react';
import { a as ani, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const Keyframes = () => {
  const { x } = useSpring({
    from: {
      x: 0,
    },
    x: 1,
  });

  const [big, setBig] = useState(false);
  const bigStyles = useSpring({ fontSize: big ? 64 : 16 });

  const rotate = x
    .to({
      range: [0, 1],
      output: [0, -40],
    })
    .to(x => `rotate(${x}deg)`);

  return (
    <DefaultLayout pageTitle="Keyframes">
      <div className="container mx-auto pt-4">
        <ani.div
          className="uppercase mt-32 inline-block text-3xl"
          style={{
            transform: rotate,
            backfaceVisibility: 'hidden',
          }}
        >
          <ani.div
            className="w-12 bg-green-400"
            style={{
              x: x.to({
                range: [0, 0.5, 1],
                output: [0, 30, 100],
              }),
            }}
          >
            <span className="ml-2">Inter</span>
          </ani.div>
          <ani.div
            className="w-24 bg-yellow-400"
            style={{
              x: x.to({
                range: [0, 0.5, 1],
                output: [200, 180, 100],
              }),
            }}
          >
            <span className="ml-2">polation</span>
          </ani.div>
          <ani.div
            className="w-16 bg-blue-400"
            style={{
              x: 100,
              y: x.to({
                range: [0, 0.5, 1],
                output: [140, 50, 0],
              }),
            }}
          >
            <span className="ml-2">stuff</span>
          </ani.div>
        </ani.div>
      </div>
      <div className="container mx-auto">
        <div>
          <Button onClick={() => setBig(b => !b)}>Toggle size</Button>
        </div>
        <ani.div style={bigStyles} className="inline-block">
          could be smol, could be big
        </ani.div>
      </div>
    </DefaultLayout>
  );
};

export default Keyframes;
