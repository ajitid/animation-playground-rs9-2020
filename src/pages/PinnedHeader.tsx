import React, { useState, useRef } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useScroll } from 'react-use-gesture';

import DefaultLayout from 'layouts/DefaultLayout';

// recreated https://twitter.com/steveruizok/status/1231516202050043905

const PinnedHeader = () => {
  return (
    <DefaultLayout pageTitle="From state">
      <div className="mx-auto relative h-screen overflow-hidden">{'yo'}</div>
    </DefaultLayout>
  );
};

export default PinnedHeader;
