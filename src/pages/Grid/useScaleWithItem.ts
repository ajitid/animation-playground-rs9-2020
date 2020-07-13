import { useEffect, useContext, RefObject } from 'react';

import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';

const useScaleWithItem = (containerRef: RefObject<HTMLElement>) => {
  const { relayout, cols, gridWidth } = useContext(PackingGridContext);
  const { itemRef } = useContext(ItemContext);

  useEffect(() => {
    const container = containerRef.current;
    const item = itemRef.current;
    if (!container || !item || gridWidth === 0) return;

    const xSpace =
      parseFloat(getComputedStyle(item).marginLeft.replace('px', '')) +
      parseFloat(getComputedStyle(item).marginRight.replace('px', ''));
    container.style.width = `${(gridWidth - xSpace * cols) / cols}px`;
    relayout();
  }, [cols, containerRef, gridWidth, itemRef, relayout]);
};

export default useScaleWithItem;
