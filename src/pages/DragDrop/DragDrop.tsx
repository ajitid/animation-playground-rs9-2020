import React, { useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DefaultLayout from 'layouts/DefaultLayout';
import { AlertCircle } from 'react-feather';

const SmallCard = () => {
  const [collected, drag] = useDrag({
    item: {
      type: 'info',
      id: 1,
    },
  });

  return (
    <div
      ref={drag}
      style={{
        maxWidth: 180,
        minHeight: 70,
      }}
      className="bg-cbn-700 px-3 rounded flex items-center justify-between"
    >
      <div className="font-medium tracking-wide text-blue-400 uppercase">Complex</div>
      <div className="font-medium">700</div>
    </div>
  );
};

const BigCard = () => {
  return (
    <div
      style={{
        minWidth: 240,
        minHeight: 170,
      }}
      className="shadow-lg p-3 rounded bg-cbn-700 inline-block"
    >
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-medium tracking-wide text-blue-400 uppercase">
            Complex
          </div>
        </div>
        <div>
          <div className="uppercase text-sm font-medium bg-red-600 text-cbn-700 rounded-sm px-1">
            {/* Secondary -> */}
            {/* <div className="uppercase text-sm font-medium bg-red-800 bg-opacity-25 text-red-500 rounded-sm px-1"> */}
            Critical
          </div>
        </div>
      </div>
      <div
        style={{ fontVariantNumeric: 'tabular-nums' }}
        className="text-5xl text-center font-medium"
      >
        700
      </div>
    </div>
  );
};

const DragDrop: React.FC = () => {
  const [items, setItems] = useState<Array<number>>([]);

  const [collected, drop] = useDrop({
    accept: 'info',
    drop() {
      setItems(prevItems => [...prevItems, 2]);
    },
  });

  return (
    <DefaultLayout pageTitle="Drag and drop">
      <div className="min-h-screen bg-cbn-800 text-cbn-100 p-5">
        <div className="mb-4">
          <SmallCard />
        </div>
        <BigCard />

        <div ref={drop} className="bg-gray-300" style={{ height: 200 }}>
          {items.map((x, i) => (
            <div key={i} className="text-yellow-500">
              yas
            </div>
          ))}
        </div>
        <div className="bg-red-300" style={{ height: 150 }}></div>
      </div>
    </DefaultLayout>
  );
};

export default () => (
  <DndProvider backend={HTML5Backend}>
    <DragDrop />
  </DndProvider>
);
