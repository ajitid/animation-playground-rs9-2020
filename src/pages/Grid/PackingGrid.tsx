import React, { useRef, useState, createContext, useEffect, useCallback } from 'react';
import Muuri, { Item } from 'muuri';
import useDimensions from 'react-cool-dimensions';

import { noop } from 'utils/helpers';

interface PackingGridContextShape {
  grid: Muuri | null;
  relayout: () => void;
  cols: number;
  gridWidth: number;
}

export const PackingGridContext = createContext<PackingGridContextShape>({
  grid: null,
  relayout: noop,
  cols: 1,
  gridWidth: 0,
});

const PackingGrid: React.FC<{
  onLayoutChange?: (itemsId: Array<string>) => void;
  cols: number;
}> = ({ children, onLayoutChange = noop, cols }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Muuri | null>(null);

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
      const idsWithNull = items.map(item => item.getElement()?.dataset.gridItemId ?? null);
      const ids = idsWithNull.filter(key => Boolean(key)) as Array<string>;

      onLayoutChange(ids);
    };
    grid.on('layoutEnd', handleLayoutEnd);

    const handleDragEnd = () => {
      const idsWithNull = grid
        .getItems()
        .map(item => item.getElement()?.dataset.gridItemId ?? null);
      const ids = idsWithNull.filter(key => Boolean(key)) as Array<string>;

      onLayoutChange(ids);
    };
    grid.on('dragEnd', handleDragEnd);

    setGrid(grid);

    return () => {
      grid.off('layoutEnd', handleLayoutEnd);
      grid.off('dragEnd', handleDragEnd);

      grid.destroy();
    };
  }, [onLayoutChange]);

  const relayout = useCallback(() => {
    if (!grid) return;
    grid.refreshItems().layout();
  }, [grid]);

  const { width: gridWidth } = useDimensions(elRef, {
    useBorderBoxSize: true,
  });

  return (
    <PackingGridContext.Provider value={{ grid, relayout, cols, gridWidth }}>
      <div ref={elRef} style={{ position: 'relative' }} className="bg-gray-300 w-64">
        {children}
      </div>
    </PackingGridContext.Provider>
  );
};

export default PackingGrid;
