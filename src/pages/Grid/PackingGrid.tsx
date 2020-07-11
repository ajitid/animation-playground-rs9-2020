import React, { useRef, useEffect, useState, createContext } from 'react';
import Muuri from 'muuri';

interface PackingGridContextShape {
  grid: Muuri | null;
}

export const PackingGridContext = createContext<PackingGridContextShape>({
  grid: null,
});

const PackingGrid: React.FC = ({ children }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Muuri | null>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const grid = new Muuri(elRef.current, {
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

    setGrid(grid);

    return () => {
      grid.destroy();
    };
  }, []);

  return (
    <PackingGridContext.Provider value={{ grid }}>
      <div ref={elRef} style={{ position: 'relative' }} className="bg-gray-300 w-64">
        {children}
      </div>
    </PackingGridContext.Provider>
  );
};

export default PackingGrid;
