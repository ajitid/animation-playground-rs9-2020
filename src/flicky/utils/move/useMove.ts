import { useLayoutEffect, RefObject, useContext, useEffect } from 'react';
import { useSpring } from '@react-spring/web';

import { Position } from './types';
import usePreviousValue from 'hooks/usePreviousValue';
import MoveContext from './MoveContext';

interface UseMoveShape<T extends HTMLElement = HTMLElement> {
  id: string;
  ref: RefObject<T>;
  key: any;
}

const useMove = ({ id, ref, key }: UseMoveShape) => {
  const { getCachedPosition, updateCachedPosition } = useContext(MoveContext);

  const [styles, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    config: {
      frequency: 3,
      damping: 0.9,
    },
  }));

  // anim on key change
  useLayoutEffect(() => {
    const cachedPosition = getCachedPosition(id);
    if (ref.current === null || cachedPosition === null) return;

    const newPositionDomRect = ref.current.getBoundingClientRect();
    const newPosition = {
      height: newPositionDomRect.height,
      left: newPositionDomRect.left,
      top: newPositionDomRect.top,
      width: newPositionDomRect.width,
    };
    console.log('happened', cachedPosition, newPosition);

    set({
      from: {
        x: cachedPosition.left + styles.x.get() - newPosition.left,
        y: cachedPosition.top + styles.y.get() - newPosition.top,
        scaleX: (styles.scaleX.get() * cachedPosition.width) / newPosition.width,
        scaleY: (styles.scaleY.get() * cachedPosition.height) / newPosition.height,
      },
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });
  }, [key]); /* eslint-disable-line react-hooks/exhaustive-deps */

  // unmount read
  useEffect(() => {
    const position = ref.current?.getBoundingClientRect(); /* eslint-disable-line react-hooks/exhaustive-deps */
    if (!position) return;
    const { height, left, top, width } = position;
    updateCachedPosition(id, { height, left, top, width });
  }, [key]); /* eslint-disable-line react-hooks/exhaustive-deps */

  // // unmount read
  // useEffect(() => {
  //   return () => {
  //     const position = ref.current?.getBoundingClientRect(); /* eslint-disable-line react-hooks/exhaustive-deps */
  //     if (!position) return;
  //     const { height, left, top, width } = position;
  //     updateCachedPosition(id, { height, left, top, width });
  //   };
  // }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  return styles;
};

export default useMove;
