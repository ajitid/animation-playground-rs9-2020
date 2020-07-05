import { useLayoutEffect, RefObject, useContext, useEffect, useRef } from 'react';
import { useSpring, SpringConfig, config as configPresets } from '@react-spring/web';

import { Position, MoveStylesOptional, MoveStyles } from './types';
import usePreviousValue from 'hooks/usePreviousValue';
import MoveContext from './MoveContext';

export interface UseMoveShape<T extends HTMLElement = HTMLElement> {
  id: string | number;
  ref?: RefObject<T>;
  key: any;
  addStyles?: MoveStylesOptional;
  config?: SpringConfig;
}

const unkownAddStyles = { x: 0, y: 0, scaleX: 1, scaleY: 1 };

const useMove = <T extends HTMLElement = HTMLElement>({
  id,
  ref,
  key,
  addStyles = unkownAddStyles,
  config,
}: UseMoveShape<T>) => {
  const toApplyAddStyles = {
    ...unkownAddStyles,
    ...addStyles,
  };

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
    config: config ?? configPresets.default,
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
        x: prevPosition.left + styles.x.get() - newPosition.left + toApplyAddStyles.x,
        y: prevPosition.top + styles.y.get() - newPosition.top + toApplyAddStyles.y,
        scaleX:
          ((styles.scaleX.get() * prevPosition.width) / newPosition.width) *
          toApplyAddStyles.scaleX,
        scaleY:
          ((styles.scaleY.get() * prevPosition.height) / newPosition.height) *
          toApplyAddStyles.scaleY,
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
