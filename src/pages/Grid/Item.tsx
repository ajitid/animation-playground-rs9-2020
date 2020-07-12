import React, { useContext, useEffect, useRef } from 'react';

import { PackingGridContext } from './PackingGrid';

type ElAttrs = Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

interface ItemProps extends ElAttrs {
  itemId: string;
}

const Item: React.FC<ItemProps> = ({ children, className, style, itemId }) => {
  const { grid, gridWidth, cols, relayout } = useContext(PackingGridContext);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!grid || !el) return;

    const items = grid.add(el);

    return () => {
      grid.remove(items);
    };
  }, [grid]);

  useEffect(() => {
    if (!elRef.current) return;
    elRef.current.style.width = `${gridWidth / cols}px`;
    relayout();
  }, [cols, gridWidth, relayout, grid]);

  return (
    <div
      data-grid-item-id={itemId}
      ref={elRef}
      className={className}
      style={{ ...style, position: 'absolute' }}
    >
      {children}
    </div>
  );
};

export default Item;
