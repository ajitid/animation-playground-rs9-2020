import React, { useContext, useEffect, useRef } from 'react';

import { PackingGridContext } from './PackingGrid';

type ItemAttrs = Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

const Item: React.FC<ItemAttrs> = ({ children, className, style }) => {
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
    <div ref={elRef} className={className} style={{ ...style, position: 'absolute' }}>
      {children}
    </div>
  );
};

export default Item;
