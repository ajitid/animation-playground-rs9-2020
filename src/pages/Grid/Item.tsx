import React, {
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  createContext,
} from 'react';

import { PackingGridContext } from './PackingGrid';

interface ItemContextShape {
  itemRef: MutableRefObject<HTMLDivElement | null>;
}

export const ItemContext = createContext<ItemContextShape>({
  itemRef: { current: null },
});

type ElAttrs = Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

interface ItemProps extends ElAttrs {
  itemId: string;
}

const Item: React.FC<ItemProps> = ({ children, className, style, itemId }) => {
  const { grid } = useContext(PackingGridContext);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!grid || !el) return;

    const items = grid.add(el);

    return () => {
      grid.remove(items);
    };
  }, [grid]);

  return (
    <div
      data-grid-item-id={itemId}
      ref={itemRef}
      className={`absolute ${className ?? ''}`}
      style={style}
    >
      <ItemContext.Provider value={{ itemRef }}>{children}</ItemContext.Provider>
    </div>
  );
};

export default Item;
