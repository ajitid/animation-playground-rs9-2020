import React, { useState, useRef, useEffect } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useScroll } from 'react-use-gesture';

import DefaultLayout from 'layouts/DefaultLayout';

import css from './pinned-header.module.css';

// recreated https://twitter.com/steveruizok/status/1231516202050043905

const PinnedHeader = () => {
  const [styles, set] = useSpring(() => ({
    height: 82,
    config: {
      easing: t => t * t * t,
      // duration: 400,
    },
  }));

  const scrollBind = useScroll(
    ({ xy: [_, y] }) => {
      if (y > 40) {
        set({ height: 56 });
      } else {
        set({ height: 82 });
      }
    },
    {
      domTarget: window,
    }
  );

  useEffect(scrollBind, [scrollBind]);

  return (
    <DefaultLayout pageTitle="From state">
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
