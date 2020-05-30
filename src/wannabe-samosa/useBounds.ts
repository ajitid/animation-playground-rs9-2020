import { useState, RefObject, useLayoutEffect } from 'react';

const useBounds = (ref: RefObject<HTMLElement>, bounderRef: RefObject<HTMLElement>) => {
  const [axis, set] = useState({
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  });

  useLayoutEffect(() => {
    let newAxis = {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    };

    if (!bounderRef.current || !ref.current) {
      newAxis = {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      };
    } else {
      newAxis = {
        left: 0,
        right: bounderRef.current.clientWidth - ref.current.clientWidth,
        top: 0,
        bottom: bounderRef.current.clientHeight - ref.current.clientHeight,
      };
    }

    set(newAxis);
  }, [ref, bounderRef]);

  return axis;
};

export default useBounds;
