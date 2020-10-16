import React, { ReactNode, useEffect, useRef } from 'react';

const cache: Record<string, React.ReactNode> = {};

const KeepAlive: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const renderRef = useRef<React.ReactNode>(null);

  if (Object.keys(cache).includes(id)) {
    console.log(children);
    console.log('is present in cache');
    renderRef.current = cache[id];
  } else {
    console.log('is NOT present in cache');
    cache[id] = children;
    renderRef.current = children;
  }

  useEffect(() => {
    return () => {
      console.log('keep alive cleanup');
      renderRef.current = null;
    };
  }, []);

  return <>{renderRef.current}</>;
};

export default KeepAlive;
