import React, { useState, useCallback } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

import PackingGrid from './PackingGrid';
import Item from './Item';
import Box from './Box';

const Grid: React.FC = () => {
  const [l, setL] = useState(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleOrderChange = useCallback((keys: string[]) => {
    console.log('happened');
    const l = keys.map(x => parseInt(x, 10));
    setL(l);
  }, []);

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <PackingGrid cols={3} onLayoutChange={handleOrderChange}>
          {l.map(x => (
            <Item key={x} itemId={x.toString()}>
              <Box x={x} />
            </Item>
          ))}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
