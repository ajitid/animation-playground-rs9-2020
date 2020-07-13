import React, { useRef, useCallback, useContext, useLayoutEffect, useEffect } from 'react';
import useResizeHandle from './useResizeHandle';
import { PackingGridContext } from './PackingGrid';
import useDragHandle from './useDragHandle';

const Box: React.FC<{ x: number }> = ({ x }) => {
  const marginBlockRef = useRef<HTMLDivElement>(null);

  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { relayout, cols, gridWidth } = useContext(PackingGridContext);
  const handleResizeDone = useCallback(() => {
    relayout();
  }, [relayout]);
  useResizeHandle(resizeHandleRef, containerRef, handleResizeDone);

  const dragProps = useDragHandle();

  useEffect(() => {
    const container = containerRef.current;
    const marginBlock = marginBlockRef.current;
    if (!container || !marginBlock || gridWidth === 0) return;

    const xPadding =
      parseFloat(getComputedStyle(marginBlock).paddingLeft.replace('px', '')) +
      parseFloat(getComputedStyle(marginBlock).paddingRight.replace('px', ''));
    container.style.width = `${(gridWidth - xPadding * cols) / cols}px`;
    relayout();
  }, [cols, gridWidth, relayout]);

  return (
    <div ref={marginBlockRef} className="p-4">
      <div ref={containerRef} className="bg-green-400 w-full h-10 relative">
        {x}
        <div {...dragProps} className="absolute right-0 top-0 bg-pink-500 w-2 h-2" />
        <div
          ref={resizeHandleRef}
          className="absolute right-0 bottom-0 bg-red-500 w-2 h-2"
        />
      </div>
    </div>
  );
};

export default Box;
