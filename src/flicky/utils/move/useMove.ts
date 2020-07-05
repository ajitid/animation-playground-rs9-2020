import { useLayoutEffect, RefObject, useContext, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

import { Position, MoveStyles } from './types';
import usePreviousValue from 'hooks/usePreviousValue';
import MoveContext from './MoveContext';

interface UseMoveShape<T extends HTMLElement = HTMLElement> {
  id: string;
  ref?: RefObject<T>;
  key: any;
  addStyles?: MoveStyles;
}

const useMove = <T extends HTMLElement = HTMLElement>({
  id,
  ref,
  key,
  addStyles = { x: 0, y: 0, scaleX: 1, scaleY: 1 },
}: UseMoveShape<T>) => {
  const { getCachedPosition, updateCachedPosition } = useContext(MoveContext);

  const innerRef = useRef(null);

  const getRef = () => (ref === undefined ? innerRef : ref);

  const innerCachedPosition = usePreviousValue<Position | null>(
    getRef().current?.getBoundingClientRect() ?? null
  );

  const [styles, set] = useSpring<MoveStyles>(() => ({
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
    const ref = getRef();
    if (ref.current === null || !(cachedPosition || innerCachedPosition)) return;

    const newPositionDomRect = ref.current.getBoundingClientRect();
    const newPosition: Position = {
      height: newPositionDomRect.height,
      left: newPositionDomRect.left,
      top: newPositionDomRect.top,
      width: newPositionDomRect.width,
    };

    let prevPosition = { ...newPosition };
    if (innerCachedPosition) {
      prevPosition = {
        left: innerCachedPosition.left,
        top: innerCachedPosition.top,
        width: innerCachedPosition.width,
        height: innerCachedPosition.height,
      };
    } else if (cachedPosition) {
      prevPosition = {
        left: cachedPosition.left,
        top: cachedPosition.top,
        width: cachedPosition.width,
        height: cachedPosition.height,
      };
    }

    set({
      from: {
        x: prevPosition.left + styles.x.get() - newPosition.left + addStyles.x,
        y: prevPosition.top + styles.y.get() - newPosition.top + addStyles.y,
        scaleX:
          ((styles.scaleX.get() * prevPosition.width) / newPosition.width) *
          addStyles.scaleX,
        scaleY:
          ((styles.scaleY.get() * prevPosition.height) / newPosition.height) *
          addStyles.scaleY,
      },
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });
  }, [key]); /* eslint-disable-line react-hooks/exhaustive-deps */

  // unmount read for new page transition
  useEffect(() => {
    return () => {
      const position = getRef().current?.getBoundingClientRect(); /* eslint-disable-line react-hooks/exhaustive-deps */
      if (!position) return;
      const { height, left, top, width } = position;
      updateCachedPosition(id, { height, left, top, width });
    };
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

  return { style: styles, ref: getRef() };
};

export default useMove;
