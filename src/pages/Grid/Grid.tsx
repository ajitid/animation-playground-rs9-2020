import React, { useState, useRef, useCallback } from 'react';
import { a as ani, useTransition } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

import PackingGrid from './PackingGrid';
import Item from './Item';
import DragHandle from './DragHandle';

const Grid: React.FC = () => {
  const [l, setL] = useState(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleOrderChange = useRef((keys: string[]) => {
    const l = keys.map(x => parseInt(x));
    setL(l);
  });

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <PackingGrid onOrderChange={handleOrderChange.current}>
          {l.map(x => (
            <Item key={x} itemId={x.toString()}>
              <div className="bg-green-400 w-8 h-8 m-4">{x}</div>
            </Item>
          ))}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
