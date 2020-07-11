import React, { useState, useRef } from 'react';
import { a as ani, useTransition } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

import PackingGrid from './PackingGrid';
import Item from './Item';
import DragHandle from './DragHandle';

const Grid: React.FC = () => {
  const l = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [swapValue, setSwapValue] = useState(false);
  const swap = () => {
    setSwapValue(s => !s);
  };

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(s => !s);
  };

  const [showAnother, setShowAnother] = useState(false);
  const toggleShowAnother = () => {
    setShowAnother(s => !s);
  };

  const handleOrderChange = useRef((items: any) => {
    console.log(items);
  });

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <div>
          <button onClick={swap}>swap</button>
        </div>
        <div>
          <button onClick={toggleShow}>show</button>
        </div>
        <div>
          <button onClick={toggleShowAnother}>show another</button>
        </div>
        <PackingGrid onOrderChange={handleOrderChange.current}>
          {l.map(x => (
            <Item key={x} itemId={x.toString()}>
              <div className="bg-green-400 w-8 h-8 m-4">1</div>
            </Item>
          ))}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
