import React, { useState, createContext, useContext, useCallback } from 'react';
import { useSpring, a, SpringStartFn } from '@react-spring/web';
import { noop } from 'utils/helpers';
import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';

interface RectOptional {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
}

interface Options extends RectOptional {
  from?: RectOptional;
}

interface SetPositionShape {
  (options: Options, item: HTMLDivElement): void;
}

export interface MovingBoxContextShape {
  setPosition: SetPositionShape;
  setShow: Function;
}

export const MovingBoxContext = createContext<MovingBoxContextShape>({
  // @ts-ignore
  setPosition: noop,
  setShow: noop,
});

const MovingBox: React.FC = ({ children }) => {
  const { gridWidth, cols } = useContext(PackingGridContext);

  const [show, setShow] = useState(false);

  const [style, set] = useSpring(() => ({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    config: {
      frequency: 0.3,
      damping: 1,
    },
  }));

  const setPosition = useCallback<SetPositionShape>(
    (options, item) => {
      const computed = getComputedStyle(item);
      const itemMargins = {
        top: parseFloat(computed.marginTop.replace('px', '')),
        bottom: parseFloat(computed.marginBottom.replace('px', '')),
        left: parseFloat(computed.marginLeft.replace('px', '')),
        right: parseFloat(computed.marginRight.replace('px', '')),
      };
      const itemRect = item.getBoundingClientRect();

      const totalWidth = itemMargins.left + itemRect.width + itemMargins.right;

      if (options.width !== undefined) {
        const perColWidth = gridWidth / cols;
        const insideColBoundsWidth = totalWidth % perColWidth;
        const exceedsFromHalf = insideColBoundsWidth > perColWidth / 2;

        console.log(insideColBoundsWidth, perColWidth);

        if (exceedsFromHalf) {
          options.width =
            totalWidth -
            insideColBoundsWidth +
            perColWidth -
            (itemMargins.left + itemMargins.right);
        } else {
          options.width =
            totalWidth - insideColBoundsWidth - (itemMargins.left + itemMargins.right);
        }
      }

      set(options);
    },
    [cols, gridWidth, set]
  );

  return (
    <MovingBoxContext.Provider value={{ setShow, setPosition }}>
      {children}
      {show && <a.div className="bg-blue-700 opacity-25 fixed" style={style} />}
    </MovingBoxContext.Provider>
  );
};

const toNearest = (x: number, n: number, y: number) => (n > x + (y - x) / 2 ? y : x);

export default MovingBox;
