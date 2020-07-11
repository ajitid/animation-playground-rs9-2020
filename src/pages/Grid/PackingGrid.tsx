import React, { useRef, useState, createContext, useEffect } from 'react';
import Muuri, { Item } from 'muuri';

import { noop } from 'utils/helpers';

interface PackingGridContextShape {
  grid: Muuri | null;
}

export const PackingGridContext = createContext<PackingGridContextShape>({
  grid: null,
});

const PackingGrid: React.FC<{
  onOrderChange?: (itemsId: Array<string>) => void;
}> = ({ children, onOrderChange = noop }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Muuri | null>(null);
  const order = useRef<Array<string>>([]);

  useEffect(() => {
    if (!elRef.current) return;
    const grid = new Muuri(elRef.current, {
      dragEnabled: true,
      dragHandle: '[data-grid-item-drag-handle]',
      layout: {
        fillGaps: true,
      },
    });

    /*
      Muuri, on initialisation, recognizes its children and automatically adds
      them into its items list. We need to clean that up as Item component
      itself adds that item to the list.
    */
    grid.remove(grid.getItems());

    const handleLayoutEnd = (items: Item[]) => {
      const keysWithNull = items.map(item => item.getElement()?.dataset.gridItemId ?? null);
      const keys = keysWithNull.filter(key => Boolean(key));

      order.current = keys as Array<string>;
      onOrderChange(order.current);
    };
    grid.on('layoutEnd', handleLayoutEnd);

    const handleDragEnd = () => {
      const keysWithNull = grid
        .getItems()
        .map(item => item.getElement()?.dataset.gridItemId ?? null);
      const keys = keysWithNull.filter(key => Boolean(key));

      if (order.current.join() === keys.join()) return;

      order.current = keys as Array<string>;
      onOrderChange(order.current);
    };
    grid.on('dragEnd', handleDragEnd);

    setGrid(grid);

    return () => {
      grid.off('layoutEnd', handleLayoutEnd);
      grid.off('dragEnd', handleDragEnd);

      grid.destroy();
    };
  }, [onOrderChange]);

  return (
    <PackingGridContext.Provider value={{ grid }}>
      <div ref={elRef} style={{ position: 'relative' }} className="bg-gray-300 w-64">
        {children}
      </div>
    </PackingGridContext.Provider>
  );
};

export default PackingGrid;
