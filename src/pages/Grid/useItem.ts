import { useCallback, RefObject, useContext } from 'react';

import useScaleWithItem from './useScaleWithItem';
import { PackingGridContext } from './PackingGrid';
import useResizeHandle, { OnResizeDoneShape } from './useResizeHandle';
import useDragHandle from './useDragHandle';
import { ItemContext } from './Item';

interface UseItemOptions {
  height: number;
  containerRef: RefObject<HTMLElement>;
  resizeHandleRef: RefObject<HTMLElement>;
}

const useItem = ({ containerRef, height, resizeHandleRef }: UseItemOptions) => {
  const { relayout, onResize } = useContext(PackingGridContext);
  const { itemId } = useContext(ItemContext);

  useScaleWithItem(containerRef, height);

  const handleResizeDone = useCallback<OnResizeDoneShape>(
    pos => {
      relayout();
      onResize(itemId, pos);
    },
    [itemId, onResize, relayout]
  );
  useResizeHandle(resizeHandleRef, containerRef, height, handleResizeDone);

  const dragProps = useDragHandle();

  return {
    dragProps,
  };
};

export default useItem;