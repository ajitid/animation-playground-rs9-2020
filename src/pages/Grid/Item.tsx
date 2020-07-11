import React, { useContext, useEffect, useRef } from 'react';

import { PackingGridContext } from './PackingGrid';

const Item: React.FC = ({ children }) => {
  const { grid } = useContext(PackingGridContext);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!grid || !el) return;

    const items = grid.add(el);

    return () => {
      grid.remove(items);
    };
  }, [grid]);

  return (
    <div ref={elRef} style={{ position: 'absolute' }}>
      {children}
    </div>
  );
};

export default Item;
