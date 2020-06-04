import { RefObject, useLayoutEffect, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

/*
  - for received msgs, scroll if within buffer
  - for sent msgs, scroll to bottom automatically -> this can be forced using a fn
*/

const usePinToBottom = (
  ref: RefObject<HTMLElement>,
  buffer = 76,
  crossBufferScroll = false
) => {
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
    // TODO needs decay
  }));

  // scroll if wihtin buffer
  const pinToBottomRef = useRef(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { scrollTop, clientHeight, scrollHeight } = node;
    pinToBottomRef.current = scrollTop + clientHeight + buffer >= scrollHeight;
  });

  // manipulates pin to bottom to add crossBufferScroll
  const prevScrollAttrsRef = useRef({
    scrollTop: 0,
    clientHeight: 0,
    scrollHeight: 0,
  });
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { scrollTop, clientHeight, scrollHeight } = node;
    prevScrollAttrsRef.current = {
      scrollTop,
      clientHeight,
      scrollHeight,
    };
  }, [ref]);
  useLayoutEffect(() => {
    if (!crossBufferScroll) return;

    const node = ref.current;
    if (!node) return;

    const { scrollTop, clientHeight, scrollHeight } = prevScrollAttrsRef.current;
    pinToBottomRef.current = scrollTop + clientHeight + buffer >= scrollHeight;

    prevScrollAttrsRef.current = {
      scrollTop: node.scrollTop,
      clientHeight: node.clientHeight,
      scrollHeight: node.scrollHeight,
    };
  });

  // carries out usual scroll to bottom
  useEffect(() => {
    const node = ref.current;
    const pinToBottom = pinToBottomRef.current;
    if (!(node && pinToBottom)) return;

    const { scrollHeight, clientHeight, scrollTop } = node;
    change({
      from: {
        scrollTop,
      },
      scrollTop: scrollHeight - clientHeight,
    });
  });

  // manually scroll to bottom
  const forceScrollRef = useRef(false);
  useEffect(() => {
    const node = ref.current;
    const needToScroll = forceScrollRef.current;
    if (!(node && needToScroll)) return;

    forceScrollRef.current = false;
    const { scrollHeight, clientHeight } = node;
    change({
      scrollTop: scrollHeight - clientHeight,
    });
  });

  const scrollToBottom = () => {
    const node = ref.current;
    if (!node) return;
    change({
      from: {
        scrollTop: node.scrollTop,
      },
    });
    forceScrollRef.current = true;
  };

  return { scrollToBottom };
};

export default usePinToBottom;

// import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

// import { nanoid } from 'nanoid';

// interface ScrollToBottomOptions {
//   buffer?: number;
// }

// const useScrollToBottom = (
//   ref: React.RefObject<HTMLElement>,
//   { buffer = 50 }: ScrollToBottomOptions = {}
// ) => {
//   const [key, setKey] = useState(() => nanoid());
//   const y = useSpring(0, { damping: 160, stiffness: 260, velocity: 54, mass: 2 });

//   function scrollToBottom() {
//     setKey(nanoid());
//   }

//   // manually scroll to bottom
//   useEffect(() => {
//     if (ref.current === null) return;
//     const node = ref.current;
//     y.set(node.scrollTop);
//     const cancel = y.onChange(y => {
//       node.scrollTop = y;
//     });
//     y.set(node.scrollHeight - node.clientHeight);

//     return cancel;
//   }, [key, ref, y]);

//   return scrollToBottom;
// };

// export default useScrollToBottom;
