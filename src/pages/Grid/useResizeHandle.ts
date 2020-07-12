import { useEffect, RefObject, useRef } from 'react';
import { noop } from 'utils/helpers';

const useResizeHandle = (
  handleRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  onResizeDone = noop
) => {
  // const capturedHandleBoundsRef = useRef<RectReadOnly>({
  //   bottom: 0,
  //   height: 0,
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   width: 0,
  //   x: 0,
  //   y: 0,
  // });

  useEffect(() => {
    const handle = handleRef.current;
    const container = containerRef.current;

    if (handle === null || container === null) return;

    function resize(e: MouseEvent) {
      if (handle === null || container === null) return;

      const newWidth = e.pageX - container.getBoundingClientRect().left;
      if (newWidth > handle.getBoundingClientRect().width) {
        container.style.width = `${newWidth}px`;
      }

      const newHeight = e.pageY - container.getBoundingClientRect().top;
      if (newHeight > handle.getBoundingClientRect().height) {
        container.style.height = `${newHeight}px`;
      }
    }

    function stopResize() {
      onResizeDone();
      window.removeEventListener('pointermove', resize);
      window.removeEventListener('pointerup', stopResize);
    }

    function handleMouseDown(e: MouseEvent) {
      e.preventDefault();
      window.addEventListener('pointermove', resize);
      window.addEventListener('pointerup', stopResize);
    }

    handle.addEventListener('mousedown', handleMouseDown);

    return () => {
      handle.removeEventListener('mousedown', handleMouseDown);
    };
  }, [containerRef, handleRef, onResizeDone]);

  return [handleRef, containerRef];
};

export default useResizeHandle;
