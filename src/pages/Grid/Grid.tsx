import React, { useState, useCallback } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

import PackingGrid from './PackingGrid';
import Item from './Item';
import DragHandle from './DragHandle';

const Grid: React.FC = () => {
  const [l, setL] = useState(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleOrderChange = useCallback((keys: string[]) => {
    const l = keys.map(x => parseInt(x, 10));
    setL(l);
  }, []);

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <PackingGrid onOrderChange={handleOrderChange}>
          {l.map(x => (
            <Item key={x} itemId={x.toString()}>
              <div
                style={{ resize: 'both', overflow: 'auto' }}
                className="bg-green-400 w-8 h-8 m-4"
              >
                {x}
                <DragHandle>
                  <span>s</span>
                </DragHandle>
              </div>
            </Item>
          ))}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
