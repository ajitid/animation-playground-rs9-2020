import KeepAlive from 'elements/KeepAlive';
import React, { useEffect, useState } from 'react';

const Counter = () => {
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setEpoch(e => e + 1);
    }, 1000);

    return () => {
      console.log('cleanup for interval called');
      clearInterval(id);
    };
  }, []);

  return <div>{epoch}</div>;
};

const KeepingAlive = () => {
  const [show, setShow] = useState(true);

  const toggle = () => {
    setShow(s => !s);
  };

  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {show && (
        <KeepAlive id="counter-1">
          <Counter />
        </KeepAlive>
      )}
    </div>
  );
};

export default KeepingAlive;
