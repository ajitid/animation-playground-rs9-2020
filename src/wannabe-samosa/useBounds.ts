import { useState, RefObject, useLayoutEffect } from 'react';

const useBounds = (ref: RefObject<HTMLElement>, bounderRef: RefObject<HTMLElement>) => {
  const [bounds, set] = useState({
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  });

  useLayoutEffect(() => {
    let newBounds = {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    };

    if (!bounderRef.current || !ref.current) {
      newBounds = {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      };
    } else {
      newBounds = {
        left: 0,
        right: bounderRef.current.clientWidth - ref.current.clientWidth,
        top: 0,
        bottom: bounderRef.current.clientHeight - ref.current.clientHeight,
      };
    }

    set(newBounds);
  }, [ref, bounderRef]);

  return bounds;
};

export default useBounds;
