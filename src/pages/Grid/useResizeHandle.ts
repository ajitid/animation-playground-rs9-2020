import { useEffect, RefObject, useContext } from 'react';
import { noop } from 'utils/helpers';
import { MovingBoxContext } from './MovingBox';
import { ItemContext } from './Item';

const useResizeHandle = (
  handleRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  onResizeDone = noop
) => {
  const { setPosition, setShow } = useContext(MovingBoxContext);
  const { itemRef } = useContext(ItemContext);

  useEffect(() => {
    const handle = handleRef.current;
    const container = containerRef.current;
    const item = itemRef.current;

    if (handle === null || container === null || item === null) return;

    function handleMouseDown(e: MouseEvent) {
      e.preventDefault();

      let isFirstResizeDone = false;
      let extraWidth = 0;
      let extraHeight = 0;

      function resize(e: MouseEvent) {
        if (handle === null || container === null || item === null) return;

        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (!isFirstResizeDone) {
          isFirstResizeDone = true;
          extraWidth = containerRect.right - e.pageX;
          extraHeight = containerRect.bottom - e.pageY;

          setPosition(
            {
              from: {
                left: containerRect.left,
                top: containerRect.top,
                height: containerRect.height,
                width: containerRect.width,
              },
              left: containerRect.left,
              top: containerRect.top,
              height: containerRect.height,
              width: containerRect.width,
            },
            item
          );
          setShow(true);
        }

        setPosition(
          {
            left: containerRect.left,
            top: containerRect.top,
            height: containerRect.height,
            width: containerRect.width,
          },
          item
        );

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
  }, [containerRef, handleRef, itemRef, onResizeDone, setPosition, setShow]);

  return [handleRef, containerRef];
};

export default useResizeHandle;
