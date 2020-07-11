import React, { useRef, useState, createContext } from 'react';
import Muuri, { Item } from 'muuri';

import { noop } from 'utils/helpers';
import useOnMount from 'hooks/useOnMount';

interface PackingGridContextShape {
  grid: Muuri | null;
}

export const PackingGridContext = createContext<PackingGridContextShape>({
  grid: null,
});

const PackingGrid: React.FC<{
  onPositionChange?: (items: Item[]) => void;
}> = ({ children, onPositionChange = noop }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Muuri | null>(null);

  useOnMount(() => {
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

    // grid.layout(false, onLayoutChange);
    grid.on('layoutEnd', items => {
      onPositionChange(items);
    });

    grid.on('dragEnd', () => {
      onPositionChange(grid.getItems());
    });

    setGrid(grid);

    return () => {
      grid.destroy();
    };
  });

  return (
    <PackingGridContext.Provider value={{ grid }}>
      <div ref={elRef} style={{ position: 'relative' }} className="bg-gray-300 w-64">
        {children}
      </div>
    </PackingGridContext.Provider>
  );
};

export default PackingGrid;
