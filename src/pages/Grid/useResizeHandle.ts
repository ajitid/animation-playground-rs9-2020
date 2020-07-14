import { useEffect, RefObject, useContext } from 'react';
import { noop } from 'utils/helpers';
import { MovingBoxContext } from './MovingBox';
import { ItemContext } from './Item';

const useResizeHandle = (
  handleRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  height: number,
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

      let finalSize = {
        width: container?.getBoundingClientRect().width ?? 0,
        height: container?.getBoundingClientRect().height ?? 0,
      };

      function resize(e: MouseEvent) {
        if (handle === null || container === null || item === null) return;

        // const itemRect = item.getBoundingClientRect();
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
            item,
            height
          );
          setShow(true);
        }

        const calculated = setPosition(
          {
            left: containerRect.left,
            top: containerRect.top,
            height: containerRect.height,
            width: containerRect.width,
          },
          item,
          height
        );

        finalSize = {
          width: calculated.width!,
          height: calculated.height!,
        };

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
        if (container === null) return;

        container.style.height = `${finalSize.height}px`;
        container.style.width = `${finalSize.width}px`;

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
  }, [containerRef, handleRef, height, itemRef, onResizeDone, setPosition, setShow]);

  return [handleRef, containerRef];
};

export default useResizeHandle;
