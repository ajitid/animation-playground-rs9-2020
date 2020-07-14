import React, { useState, createContext, useContext, useCallback } from 'react';
import { useSpring, a, SpringStartFn } from '@react-spring/web';
import { noop } from 'utils/helpers';
import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';
import clamp from 'flicky/utils/clamp';

interface RectOptional {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
}

interface Options extends RectOptional {
  from?: RectOptional;
}

interface SetPositionReturnShape extends Options {
  size: [number, number];
}

interface SetPositionShape {
  (options: Options, item: HTMLDivElement, height: number): SetPositionReturnShape;
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
  const { gridWidth, cols, elRef: gridElRef } = useContext(PackingGridContext);

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
    (options, item, height) => {
      if (gridElRef.current === null) return { ...options, size: [-1, -1] };

      const computed = getComputedStyle(item);
      const itemMargins = {
        top: parseFloat(computed.marginTop.replace('px', '')),
        bottom: parseFloat(computed.marginBottom.replace('px', '')),
        left: parseFloat(computed.marginLeft.replace('px', '')),
        right: parseFloat(computed.marginRight.replace('px', '')),
      };
      const itemRect = item.getBoundingClientRect();

      if (options.width !== undefined) {
        const totalWidth = itemMargins.left + itemRect.width + itemMargins.right;
        const perColWidth = gridWidth / cols;
        const insideColBoundsWidth = totalWidth % perColWidth;
        const exceedsFromHalf = insideColBoundsWidth > perColWidth / 2;

        const { left: gridLeft } = gridElRef.current.getBoundingClientRect();
        const colNo =
          Math.round((itemRect.left - itemMargins.left - gridLeft) / perColWidth) + 1;

        if (exceedsFromHalf) {
          options.width =
            clamp(
              0,
              gridWidth - (colNo - 1) * perColWidth,
              totalWidth - insideColBoundsWidth + perColWidth
            ) -
            (itemMargins.left + itemMargins.right);
        } else {
          options.width =
            clamp(
              0,
              gridWidth - (colNo - 1) * perColWidth,
              totalWidth - insideColBoundsWidth
            ) -
            (itemMargins.left + itemMargins.right);
        }
      }

      if (options.height !== undefined) {
        const totalHeight = itemMargins.top + itemRect.height + itemMargins.bottom;
        const perColHeight = itemMargins.top + height + itemMargins.bottom;
        const insideColBoundsHeight = totalHeight % perColHeight;
        const exceedsFromHalf = insideColBoundsHeight > perColHeight / 2;

        if (exceedsFromHalf) {
          options.height =
            totalHeight -
            insideColBoundsHeight +
            perColHeight -
            (itemMargins.top + itemMargins.bottom);
        } else {
          options.height =
            totalHeight - insideColBoundsHeight - (itemMargins.top + itemMargins.bottom);
        }
      }

      set(options);

      const { left: gridLeft } = gridElRef.current.getBoundingClientRect();
      const perColWidth = gridWidth / cols;
      const colNo =
        Math.round((itemRect.left - itemMargins.left - gridLeft) / perColWidth) + 1;

      return {
        ...options,
        size: [
          clamp(
            1,
            cols - colNo + 1,
            Math.round(
              (itemMargins.left + itemRect.width + itemMargins.right) / (gridWidth / cols)
            )
          ),
          Math.round(
            (itemRect.height - height) / (height + itemMargins.top + itemMargins.bottom)
          ) + 1,
        ],
      };
    },
    [cols, gridElRef, gridWidth, set]
  );

  return (
    <MovingBoxContext.Provider value={{ setShow, setPosition }}>
      {children}
      {show && (
        <a.div className="bg-blue-700 opacity-25 fixed" style={{ ...style, zIndex: 100 }} />
      )}
    </MovingBoxContext.Provider>
  );
};

const toNearest = (x: number, n: number, y: number) => (n > x + (y - x) / 2 ? y : x);

export default MovingBox;
