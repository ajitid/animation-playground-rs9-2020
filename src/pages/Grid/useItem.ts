import { useCallback, RefObject, useContext, useEffect } from 'react';
import { Item } from 'muuri';

import useScaleWithItem from './useScaleWithItem';
import { PackingGridContext } from './PackingGrid';
import useResizeHandle, { OnResizeDoneShape } from './useResizeHandle';
import useDragHandle from './useDragHandle';
import { ItemContext } from './Item';
import noop from 'flicky/utils/noop';

interface UseItemOptions {
  height: number;
  containerRef: RefObject<HTMLElement>;
  resizeHandleRef: RefObject<HTMLElement>;
  onResizeStart?: Function;
  onResizeDone?: Function;
  onDragStart?: Function;
  onDragDone?: Function;
}

const useItem = ({
  containerRef,
  height,
  resizeHandleRef,
  onResizeStart = noop,
  onResizeDone = noop,
  onDragStart = noop,
  onDragDone = noop,
}: UseItemOptions) => {
  const { relayout, onResize, grid } = useContext(PackingGridContext);
  const { itemId } = useContext(ItemContext);

  useScaleWithItem(containerRef, height);

  const handleResizeDone = useCallback<OnResizeDoneShape>(
    pos => {
      relayout();
      onResizeDone();
      onResize(itemId, pos);
    },
    [itemId, onResize, onResizeDone, relayout]
  );
  useResizeHandle({
    handleRef: resizeHandleRef,
    containerRef,
    height,
    onResizeStart,
    onResizeDone: handleResizeDone,
  });

  useEffect(() => {
    if (grid === null) return;

    const handleDragStart = (muuriItem: Item) => {
      const muuriItemEl = muuriItem.getElement();
      if (!muuriItemEl) return;
      if (muuriItemEl.dataset.gridItemId === itemId) {
        onDragStart();
      }
    };
    grid.on('dragStart', handleDragStart);

    const handleDragDone = (muuriItem: Item) => {
      const muuriItemEl = muuriItem.getElement();
      if (!muuriItemEl) return;
      if (muuriItemEl.dataset.gridItemId === itemId) {
        onDragDone();
      }
    };
    grid.on('dragEnd', handleDragDone);

    return () => {
      grid.off('dragStart', handleDragStart);
      grid.off('dragEnd', handleDragDone);
    };
  }, [grid, itemId, onDragDone, onDragStart]);
  const dragProps = useDragHandle();

  return {
    dragProps,
  };
};

export default useItem;
