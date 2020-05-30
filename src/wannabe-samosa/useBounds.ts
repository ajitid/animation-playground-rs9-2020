import { useState, RefObject, useLayoutEffect } from 'react';

interface BoundsShape {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

const useBounds = (ref: RefObject<HTMLElement>, bounderRef: RefObject<HTMLElement>) => {
  const [bounds, set] = useState<BoundsShape>({});

  useLayoutEffect(() => {
    let newBounds: BoundsShape = {};

    if (!bounderRef.current || !ref.current) {
      newBounds = {};
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
