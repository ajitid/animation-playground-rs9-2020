import { useEffect, RefObject } from 'react';
import { noop } from 'utils/helpers';

const useResizeHandle = (
  handleRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  onResizeDone = noop
) => {
  useEffect(() => {
    const handle = handleRef.current;
    const container = containerRef.current;

    if (handle === null || container === null) return;

    function handleMouseDown(e: MouseEvent) {
      e.preventDefault();

      let isFirstResizeDone = false;
      let extraWidth = 0;
      let extraHeight = 0;

      function resize(e: MouseEvent) {
        if (handle === null || container === null) return;

        if (!isFirstResizeDone) {
          isFirstResizeDone = true;
          extraWidth = container.getBoundingClientRect().right - e.pageX;
          extraHeight = container.getBoundingClientRect().bottom - e.pageY;
        }

        const newWidth = e.pageX - container.getBoundingClientRect().left + extraWidth;
        if (newWidth > handle.getBoundingClientRect().width) {
          container.style.width = `${newWidth}px`;
        }

        const newHeight = e.pageY - container.getBoundingClientRect().top + extraHeight;
        if (newHeight > handle.getBoundingClientRect().height) {
          container.style.height = `${newHeight}px`;
        }
      }

      function stopResize() {
        onResizeDone();
        window.removeEventListener('pointermove', resize);
        window.removeEventListener('pointerup', stopResize);
      }

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
