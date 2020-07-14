import { useCallback, RefObject, useContext } from 'react';

import useScaleWithItem from './useScaleWithItem';
import { PackingGridContext } from './PackingGrid';
import useResizeHandle from './useResizeHandle';
import useDragHandle from './useDragHandle';

interface UseItemOptions {
  height: number;
  containerRef: RefObject<HTMLElement>;
  resizeHandleRef: RefObject<HTMLElement>;
}

const useItem = ({ containerRef, height, resizeHandleRef }: UseItemOptions) => {
  const { relayout } = useContext(PackingGridContext);

  useScaleWithItem(containerRef, height);

  const handleResizeDone = useCallback(() => {
    relayout();
  }, [relayout]);
  useResizeHandle(resizeHandleRef, containerRef, height, handleResizeDone);

  const dragProps = useDragHandle();

  return {
    dragProps,
  };
};

export default useItem;
