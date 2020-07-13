import { useEffect, useContext, RefObject } from 'react';

import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';

const useScaleWithItem = (itemContentBlockRef: RefObject<HTMLElement>) => {
  const { relayout, cols, gridWidth } = useContext(PackingGridContext);
  const { itemRef } = useContext(ItemContext);

  useEffect(() => {
    const item = itemRef.current;
    const itemContent = itemContentBlockRef.current;
    if (!item || !itemContent || gridWidth === 0) return;

    const excessWidth =
      parseFloat(getComputedStyle(item).marginLeft.replace('px', '')) +
      parseFloat(getComputedStyle(item).marginRight.replace('px', ''));
    itemContent.style.width = `${gridWidth / cols - excessWidth}px`;
    relayout();
  }, [cols, itemContentBlockRef, gridWidth, relayout, itemRef]);
};

export default useScaleWithItem;
