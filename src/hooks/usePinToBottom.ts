import { RefObject, useLayoutEffect, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/web';

/*
  - for received msgs, scroll if within buffer
  - for sent msgs, scroll to bottom automatically -> this can be forced using a fn
*/

interface PinToBottomConfig {
  buffer?: number;
  crossBufferScroll?: boolean;
}

const usePinToBottom = (
  ref: RefObject<HTMLElement>,
  key: string | number,
  { buffer = 76, crossBufferScroll = false }: PinToBottomConfig = {}
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
    // TODO needs decay
  }));

  // Scroll if wihtin buffer
  const pinToBottomRef = useRef(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { scrollTop, clientHeight, scrollHeight } = node;
    pinToBottomRef.current = scrollTop + clientHeight + buffer >= scrollHeight;
  }, [buffer, key, ref]);

  // carries out scroll to bottom as usual
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
  }, [change, key, ref]);

  // manually scroll to bottom
  const forceScrollRef = useRef(false);
  useEffect(() => {
    const node = ref.current;
    const needToScroll = forceScrollRef.current;
    if (!(node && needToScroll)) return;

    forceScrollRef.current = false;
    const { scrollHeight, clientHeight, scrollTop } = node;
    change({
      from: {
        scrollTop,
      },
      scrollTop: scrollHeight - clientHeight,
    });
  });

  const scrollToBottom = () => {
    const node = ref.current;
    if (!node) return;
    forceScrollRef.current = true;
  };

  return { scrollToBottom };
};

export default usePinToBottom;

// manipulates pin to bottom to add crossBufferScroll
// const prevScrollAttrsRef = useRef({
//   scrollTop: 0,
//   clientHeight: 0,
//   scrollHeight: 0,
// });
// useLayoutEffect(() => {
//   const node = ref.current;
//   if (!node) return;
//   if (!crossBufferScroll) return;
//   // do not calculate whether to scroll if scroll height itself hasn't changed
//   if (prevScrollAttrsRef.current.scrollHeight === node.scrollHeight) return;

//   pinToBottomRef.current =
//     prevScrollAttrsRef.current.scrollTop +
//       prevScrollAttrsRef.current.clientHeight +
//       buffer >=
//     prevScrollAttrsRef.current.scrollHeight;
//   prevScrollAttrsRef.current = {
//     scrollTop: node.scrollTop,
//     clientHeight: node.clientHeight,
//     scrollHeight: node.scrollHeight,
//   };
// });
