import React, { useRef, useCallback, useContext } from 'react';
import useResizeHandle from './useResizeHandle';
import DragHandle from './DragHandle';
import { PackingGridContext } from './PackingGrid';

const Box: React.FC<{ x: number }> = ({ x }) => {
  const { relayout } = useContext(PackingGridContext);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fn = useCallback(() => {
    relayout();
  }, [relayout]);

  useResizeHandle(handleRef, containerRef, fn);

  return (
    <div ref={containerRef} className="bg-green-400 w-8 h-8 relative">
      {x}
      <DragHandle>
        <div className="absolute right-0 top-0 bg-pink-500 w-2 h-2" />
      </DragHandle>
      <div ref={handleRef} className="absolute right-0 bottom-0 bg-red-500 w-2 h-2" />
    </div>
  );
};

export default Box;
