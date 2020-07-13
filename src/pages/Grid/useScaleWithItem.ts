import { useEffect, useContext, RefObject } from 'react';

import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';
import clamp from 'flicky/utils/clamp';

const useScaleWithItem = (itemContentBlockRef: RefObject<HTMLElement>) => {
  const { relayout, cols, gridWidth } = useContext(PackingGridContext);
  const { itemRef, xUnit } = useContext(ItemContext);

  useEffect(() => {
    const item = itemRef.current;
    const itemContent = itemContentBlockRef.current;
    if (!item || !itemContent || gridWidth === 0) return;

    const clampedXUnit = clamp(1, cols, xUnit);
    const excessWidth =
      parseFloat(getComputedStyle(item).marginLeft.replace('px', '')) +
      parseFloat(getComputedStyle(item).marginRight.replace('px', ''));
    itemContent.style.width = `${(gridWidth / cols) * clampedXUnit - excessWidth}px`;
    relayout();
  }, [cols, itemContentBlockRef, gridWidth, relayout, itemRef, xUnit]);
};

export default useScaleWithItem;
