import React, { CSSProperties, useEffect, useRef } from 'react';

import useOnScreen from 'hooks/useOnScreen';

interface Props<T> {
  children: React.ReactNode;
  id: T;
  onIdHit: (id: T) => void;
  className?: string;
  style?: CSSProperties;
}

const InfiniteScroll = <T,>({ children, id, onIdHit, className, style }: Props<T>) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const isIntersectedAlreadyRef = useRef(false);

  useEffect(() => {
    isIntersectedAlreadyRef.current = false;
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry;
        if (isIntersecting && !isIntersectedAlreadyRef.current) {
          isIntersectedAlreadyRef.current = true;
          onIdHit(id);
        }
      },
      { rootMargin: '0px' }
    );

    const el = ref.current;
    if (el == null) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [id, onIdHit]);

  useEffect(() => {}, [id, onIdHit]);

  return (
    <>
      {children}
      <div ref={ref} {...{ className, style }} />
    </>
  );
};

export default InfiniteScroll;
