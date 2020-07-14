import React, { useRef, useState, useCallback } from 'react';

import useItem from './useItem';

const Box: React.FC<{ x: number }> = ({ x }) => {
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const height = 32;

  const [isResizing, setIsResizing] = useState(false);
  const onResizeStart = useCallback(() => {
    console.log('started');
    setIsResizing(true);
  }, []);
  const onResizeDone = useCallback(() => {
    setIsResizing(false);
  }, []);
  const { dragProps } = useItem({
    containerRef,
    resizeHandleRef,
    height,
    onResizeStart,
    onResizeDone,
  });

  return (
    <div
      ref={containerRef}
      className="relative bg-green-400"
      style={{ opacity: isResizing ? '80%' : '100%' }}
    >
      {x}
      <div {...dragProps} className="absolute right-0 top-0 bg-pink-500 w-2 h-2" />
      <div ref={resizeHandleRef} className="absolute right-0 bottom-0 bg-red-500 w-2 h-2" />
    </div>
  );
};

export default Box;
