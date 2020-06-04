import React, { useState, useRef, useEffect } from 'react';
import { Controller, a } from '@react-spring/web';

const Heya: React.FC = () => {
  const [show, setShow] = useState(false);

  // animator (animation controlled) pet-named anix
  const anix = useRef(
    new Controller({
      opacity: show ? 1 : 0,
    })
  ).current;

  // cleanup anix on unmount
  useEffect(() => {
    return () => {
      anix.stop();
      anix.dispose();
    };
  }, [anix]);

  const toggle = () => {
    setShow(s => !s);
  };

  (function updateNow() {
    // queue changes
    anix.update({
      opacity: show ? 1 : 0,
    });

    // continue animation with latest changes
    anix.start();
  })();

  const { springs } = anix;

  return (
    <>
      <button onClick={toggle}>toggle</button>
      <a.div style={springs}>I will fade</a.div>
    </>
  );
};

export default Heya;
