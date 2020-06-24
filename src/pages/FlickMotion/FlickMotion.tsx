import React, { useRef } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import DefaultLayout from 'layouts/DefaultLayout';
import { useBounds } from 'wannabe-samosa';

import css from './flick-motion.module.css';
import project from 'wannabe-samosa/utils/project';
import DecelerationRate from 'wannabe-samosa/utils/DecelerationRate';

const FlickMotion = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const bounds = useBounds(popoverRef, screenRef);

  const [{ x, y }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      frequency: 0.3,
      damping: 0.7,
    },
  }));

  const bindDrag = useDrag(
    ({ movement: [mx, my], down, last, vxvy }) => {
      if (down) {
        set({ x: mx, y: my });
      }

      if (last) {
        const [vx, vy] = vxvy;
        set({
          x:
            mx + project(vx, DecelerationRate.Normal) >
            ((bounds.right ?? 0) - (bounds.left ?? 0)) / 2
              ? bounds.right
              : bounds.left,
          y:
            my + project(vy, DecelerationRate.Normal) >
            ((bounds.bottom ?? 0) - (bounds.top ?? 0)) / 2
              ? bounds.bottom
              : bounds.top,
        });
      }
    },
    {
      initial: () => [x.get(), y.get()],
      filterTaps: true,
      bounds,
      // rubberband: true,
    }
  );

  return (
    <DefaultLayout pageTitle="Flick motion">
      {/* window */}
      <div className="bg-cbn-900 min-h-screen flex justify-center items-center">
        {/* phone screen */}
        <div
          ref={screenRef}
          style={{ width: 300, height: 500 }}
          className="shadow-lg rounded bg-cbn-800 overflow-hidden"
        >
          {/* popover container */}
          <div ref={popoverRef} className="p-3 inline-block">
            {/* popover  */}
            <a.div
              {...bindDrag()}
              style={{ x, y, width: 90, height: 130 }}
              className={`rounded cursor-pointer ${css.popover}`}
            ></a.div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FlickMotion;
