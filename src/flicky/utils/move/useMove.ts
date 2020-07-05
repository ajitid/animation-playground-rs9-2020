import { useLayoutEffect, RefObject } from 'react';
import { useSpring } from '@react-spring/web';
import usePreviousValue from 'hooks/usePreviousValue';

interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

const useMagicMotion = <T extends HTMLElement>(ref: RefObject<T>) => {
  const cachedPosition = usePreviousValue<Position | null>(
    ref.current?.getBoundingClientRect() ?? null
  );

  const [styles, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    config: {
      frequency: 0.7,
      damping: 0.9,
    },
  }));

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (cachedPosition === null) return;
    const newPosition = ref.current.getBoundingClientRect();

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
  });

  return styles;
};

export default useMagicMotion;
