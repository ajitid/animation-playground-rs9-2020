import { useEffect, RefObject, useContext } from 'react';
import { noop } from 'utils/helpers';
import { MovingBoxContext } from './MovingBox';

const useResizeHandle = (
  handleRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  onResizeDone = noop
) => {
  const { setPosition, setShow } = useContext(MovingBoxContext);

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

        const rect = container.getBoundingClientRect();

        if (!isFirstResizeDone) {
          isFirstResizeDone = true;
          extraWidth = rect.right - e.pageX;
          extraHeight = rect.bottom - e.pageY;

          setPosition({
            from: {
              left: rect.left,
              top: rect.top,
              height: rect.height,
              width: rect.width,
            },
          });
          setShow(true);
        }

        setPosition({
          left: rect.left,
          top: rect.top,
          height: rect.height,
          width: rect.width,
        });

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
        setShow(false);
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
  }, [containerRef, handleRef, onResizeDone, setPosition, setShow]);

  return [handleRef, containerRef];
};

export default useResizeHandle;
