import React, { useState, useCallback } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

import PackingGrid from './PackingGrid';
import Item from './Item';
import Box from './Box';

const Grid: React.FC = () => {
  const [l, setL] = useState(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleOrderChange = useCallback((keys: string[]) => {
    console.log('happened', keys);
    const l = keys.map(x => parseInt(x, 10));
    setL(l);
  }, []);

  const [cols, setCols] = useState(4);
  const changeCols = () => {
    setCols(cols => (cols === 3 ? 4 : 3));
  };

  const removeInBw = () => {
    setL(prevL => {
      const l = [...prevL];
      l.splice(2, 1);
      return l;
    });
  };

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <div>
          <button onClick={changeCols}>change cols</button>
          <button onClick={removeInBw}>remove in b/w</button>
        </div>
        <PackingGrid cols={cols} onLayoutChange={handleOrderChange}>
          {l.map(x => (
            <Item key={x} itemId={x.toString()} xUnit={x === 3 ? 3 : 1} className="m-3">
              <Box x={x} />
            </Item>
          ))}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
