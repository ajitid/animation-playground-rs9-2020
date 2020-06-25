import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { useSpring } from '@react-spring/web';

import usePreviousValue from 'hooks/usePreviousValue';

// TODO Because we are receiving a RefObject, it cannot be undefined
// so if its not passed by user, pass your own ref instead.

// Intially I'll start with <a.div being inline blocks.
// first not null el will give me top and left,
// i can take things user want to animate, for eg. transform and opacity
// and animate them, it can later be used for sticky,
// width and height also need transform

// might use usetransition to make animation across
// use sdras technique

/*
const useMorph = <T extends HTMLElement>(ref: RefObject<T>) => {
  
  const  [position, setPosition] = useState({
    prev: {
      x: 0, y: 0
    },
    curr: {
      x: 0, y: 0
    }
  })

  const prevEl = usePreviousValue(ref.current);
  
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el === prevEl) return;
    const prevRect = prevEl?.getBoundingClientRect()
    const {left, top} = el.getBoundingClientRect();
    setPosition(prevPos => ({
      prev: {
        x: ,
        y: 
      },
      curr: {
        x: 0,
        y: 0
      }
    }))
  }, [ref])


  // const { top, left, width, height } = el.getBoundingClientRect();
  // const prevPos = {}usePreviousValue()
  // const prevPos useMemo(() => {}, [el])
  const prevPos = el.getBoundingClientRect();

  useSpring({
    from: {
      x: 
      y: 1
    }
  });
};

export default useMorph;
*/
