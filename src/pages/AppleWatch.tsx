import React, { useState } from 'react';
import { a, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const Gola: React.FC = () => {
  return <div className="bg-pink-400 w-12 h-12 rounded-full inline-block m-2"></div>;
};

const AppleWatch: React.FC = () => {
  // const [big, setBig] = useState(false);
  const sheetStyle = useSpring({
    from: { x: 200 },
    to: { x: -20 },
    config: { duration: 2000 },
  });

  const gole = [...Array(rows)].map((el, i) => (
    <div key={i} className={`${i % 2 === 1 ? 'ml-8' : ''} flex`}>
      {[...Array(cols)].map((el, j) => (
        <div className="flex h-full items-center">
          <Gola key={j} />
        </div>
      ))}
    </div>
  ));

  return (
    <DefaultLayout pageTitle="Apple Watch">
      <div className="container mx-auto pt-4">
        <div className="bg-gray-300 w-64 h-64 overflow-hidden relative">
          <a.div style={sheetStyle} className="bg-black absolute top-0 left-0">
            {gole}
          </a.div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const cols = 7;
const rows = 4;

export default AppleWatch;
