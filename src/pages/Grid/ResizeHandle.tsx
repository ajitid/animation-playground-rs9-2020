import React, { RefObject, useRef } from 'react';

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

const ResizeHandle = (ref: RefObject<HTMLElement>) => {
  const innerRef = useRef<HTMLDivElement>(null);

  const capturedRefPositionRef = useRef<Position>({
    top: 0,
    height: 0,
    left: 0,
    width: 0,
  });

  const capturedInnerRefPositionRef = useRef<Position>({
    top: 0,
    height: 0,
    left: 0,
    width: 0,
  });

  const handleDragStart = () => {
    if (!ref.current || !innerRef.current) return;
    capturedInnerRefPositionRef.current = innerRef.current.getBoundingClientRect();
    capturedRefPositionRef.current = ref.current.getBoundingClientRect();
  };

  const handleDrag = () => {
    if (!ref.current || !innerRef.current) return;
    const newInnerRefPosition: Position = innerRef.current.getBoundingClientRect();
    ref.current.style.height = (
      ref.current.clientHeight +
      newInnerRefPosition.height -
      capturedRefPositionRef.current.height
    ).toString();
  };

  return (
    <div ref={innerRef} draggable onDragStart={handleDragStart} onDrag={handleDrag}>
      r
    </div>
  );
};

export default ResizeHandle;
