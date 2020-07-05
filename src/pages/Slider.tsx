import React, { useState, useRef } from 'react';
import { a as ani, useSpring } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import DefaultLayout from 'layouts/DefaultLayout';
import { useBounds } from 'flicky';

const Slider = () => {
  const scrubSize = 40;
  const sliderWidth = 140;

  const [progress, setProgress] = useState(0);

  const [{ x }, set] = useSpring(() => ({
    x: 0,
    onChange: x => {
      setProgress(Math.round((x / sliderWidth) * 100));
    },
  }));

  const inner = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);

  const bindDrag = useDrag(
    ({ down, movement: [mx] }) => {
      if (down) {
        set({ x: mx });
      }
    },
    {
      filterTaps: true,
      initial: () => [x.get(), 0],
      // bounds: { left: 0, right: sliderWidth },
      bounds: useBounds(inner, outer),
    }
  );

  return (
    <DefaultLayout pageTitle="Slider">
      <div className="container mx-auto pt-4">
        <div
          ref={outer}
          style={{ height: scrubSize, width: scrubSize + sliderWidth }}
          className="bg-blue-300 rounded relative"
        >
          <ani.div
            {...bindDrag()}
            ref={inner}
            style={{ x, height: scrubSize, width: scrubSize }}
            className="select-none absolute left-0 top-0 bg-blue-600 rounded"
          />
        </div>
        <p className="mt-1">Progress: {progress}</p>
        <p className="mt-3 text-gray-600 leading-tight">
          While this works, the scrub response is lagging behind pointer. <br /> This might
          be OK for devices having mouse as a pointer <br /> but this lag on touch devices
          will make user feel something is off.
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Slider;
