import React from 'react';
import { a, useSpring } from '@react-spring/web';
import { interpolate } from '@popmotion/popcorn';

import DefaultLayout from 'layouts/DefaultLayout';

import css from './pinned-header.module.css';
import { useViewportScroll } from 'wannabe-samosa';

// recreated https://twitter.com/steveruizok/status/1231516202050043905

const PinnedHeader = () => {
  const bigHeight = 80;
  const smallHeight = 32;
  const [styles, set] = useSpring(() => ({
    height: bigHeight,
  }));

  useViewportScroll(({ xy: [_, y] }) => {
    const height = interpolate([0, 200], [bigHeight, smallHeight])(y) as number;
    set({ height });
  });

  return (
    <DefaultLayout pageTitle="Pinned header">
      <div className="relative min-h-screen">
        <a.header
          style={styles}
          className={`${css.header} text-indigo-100 shadow-inner py-6 sticky top-0 flex items-center `}
        >
          <div className="container mx-auto flex justify-between">
            <div>Company</div>
            <div>
              <div className="inline-block mr-5">About</div>
              <div className="inline-block">Contact</div>
            </div>
          </div>
        </a.header>
        <div className="container mx-auto mt-3">
          {[...Array(40)].map((_, idx) => (
            <p key={idx}>
              {idx} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quod
              omnis ab eaque animi? Ut laboriosam maiores nam nemo corrupti soluta velit
              natus, dolor modi autem magni quis explicabo! Excepturi.
            </p>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PinnedHeader;
