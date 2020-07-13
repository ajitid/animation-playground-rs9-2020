import React, { useContext, useEffect, useRef, useLayoutEffect } from 'react';

import { PackingGridContext } from './PackingGrid';

type ElAttrs = Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

interface ItemProps extends ElAttrs {
  itemId: string;
}

const Item: React.FC<ItemProps> = ({ children, className, style, itemId }) => {
  const { grid, cols } = useContext(PackingGridContext);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!grid || !el) return;

    const items = grid.add(el);

    return () => {
      grid.remove(items);
    };
  }, [grid]);

  // useLayoutEffect(() => {
  //   const el = elRef.current;
  //   if (!el) return;
  //   // el.style.width = `${100 / cols}%`;
  //   // grid?.refreshItems();
  // }, [cols, grid]);

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
