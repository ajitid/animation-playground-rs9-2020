import React, { useState } from 'react';
import { a as ani, useTransition } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const Mount = () => {
  const [visible, setVisible] = useState(false);

  const paraTrans = useTransition(visible, {
    from: {
      transform: 'translate3d(0px,0,0)',
      opacity: 0,
    },
    enter: {
      transform: 'translate3d(30px,0,0)',
      opacity: 1,
    },
    leave: {
      transform: 'translate3d(0px,0,0)',
      opacity: 0,
    },
  });

  const para = paraTrans(
    (style, show) =>
      show && (
        <ani.p style={style} className="inline-block ml-4">
          Hello!
        </ani.p>
      )
  );

  return (
    <DefaultLayout pageTitle="Mount">
      <div className="container mx-auto pt-4">
        <Button onClick={() => setVisible(v => !v)} className="inline-block">
          Toggle visibility
        </Button>
        {para}
      </div>
    </DefaultLayout>
  );
};

export default Mount;
