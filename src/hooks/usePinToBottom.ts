import { RefObject, useLayoutEffect, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

import { noop } from 'utils/helpers';
import { easeOutQuad } from 'wannabe-samosa/utils/builtinEasings';

/*
  - for received msgs, scroll if within buffer
  - for sent msgs, scroll to bottom automatically -> this can be forced using a fn
*/

interface PinToBottomConfig {
  buffer?: number;
  crossBufferScroll?: boolean;
  scrollAction?: (willScroll: boolean) => void;
}

const usePinToBottom = (
  ref: RefObject<HTMLElement>,
  key: string | number,
  { buffer = 76, crossBufferScroll = false, scrollAction = noop }: PinToBottomConfig = {}
) => {
  // Logic to scroll to botton
  const [, change] = useSpring(() => ({
    from: {
      scrollTop: ref.current?.scrollTop ?? 0,
    },
    onChange: {
      scrollTop(v: number) {
        const node = ref.current;
        if (!node) return;
        node.scrollTop = v;
      },
    },
    config: {
      // decay is not needed here
      easing: easeOutQuad,
      duration: 400,
    },
  }));

  // Scroll if wihtin buffer
  const pinToBottomRef = useRef(false);
  const forceScrollRef = useRef(false);
  const lastScrollHeightRef = useRef(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { scrollTop, clientHeight, scrollHeight } = node;
    if (forceScrollRef.current) {
      // force scroll to bottom
      forceScrollRef.current = false;
      pinToBottomRef.current = true;
    } else if (crossBufferScroll) {
      // Is buffer able to occupy scroll height changes
      if (lastScrollHeightRef.current + buffer >= scrollHeight) {
        pinToBottomRef.current = scrollTop + clientHeight >= scrollHeight - buffer;
      } else {
        // Buffer isn't able to occupy new scroll height, so
        // create pin bound using old scroll height
        pinToBottomRef.current =
          scrollTop + clientHeight >= lastScrollHeightRef.current - buffer;
      }
    } else {
      // usual buffer scroll
      pinToBottomRef.current = scrollTop + clientHeight >= scrollHeight - buffer;
    }
    lastScrollHeightRef.current = scrollHeight;
  }, [buffer, crossBufferScroll, key, ref]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const pinToBottom = pinToBottomRef.current;
    scrollAction(pinToBottom);
    if (!pinToBottom) return;

    const { scrollHeight, clientHeight, scrollTop } = node;
    change({
      from: {
        scrollTop,
      },
      scrollTop: scrollHeight - clientHeight,
    });
  }, [change, key, ref, scrollAction]);

  // manually scroll to bottom
  const scrollToBottom = () => {
    const node = ref.current;
    if (!node) return;
    forceScrollRef.current = true;
  };

  return { scrollToBottom };
};

export default usePinToBottom;
