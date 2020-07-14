import React, { useState, useCallback } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

import PackingGrid, { OnResizeShape } from './PackingGrid';
import Item from './Item';
import Box from './Box';

const Grid: React.FC = () => {
  const [boxes, setBoxes] = useState<
    Array<{
      boxKey: string;
      xUnit: number;
      yUnit: number;
    }>
  >(() => initialBoxData);

  const handleItemResize = useCallback<OnResizeShape>((itemId, size) => {
    if (size[0] === -1 || size[1] === -1) return;
    setBoxes(prevBoxes => {
      const boxes = [...prevBoxes];
      const idx = boxes.findIndex(box => box.boxKey === itemId);
      if (idx === -1) return prevBoxes;
      boxes[idx] = {
        ...boxes[idx],
        xUnit: size[0],
        yUnit: size[1],
      };
      return boxes;
    });
  }, []);

  const handleLayoutChange = useCallback((itemIds: Array<string>) => {
    setBoxes(prevBoxes => {
      const boxes = [...prevBoxes];
      const newBoxes = itemIds
        .map(itemId => boxes.find(box => box.boxKey === itemId) ?? null)
        .filter(box => box !== null) as Array<{
        boxKey: string;
        xUnit: number;
        yUnit: number;
      }>;
      return newBoxes;
    });
  }, []);

  return (
    <DefaultLayout pageTitle="Grid">
      <PackingGrid cols={4} onResize={handleItemResize} onLayoutChange={handleLayoutChange}>
        {boxes.map(box => (
          <Item
            key={box.boxKey}
            itemId={box.boxKey}
            xUnit={box.xUnit}
            yUnit={box.yUnit}
            className="m-3"
          >
            <Box x={parseInt(box.boxKey)} />
          </Item>
        ))}
      </PackingGrid>
    </DefaultLayout>
  );
};

const initialBoxData: Array<{
  boxKey: string;
  xUnit: number;
  yUnit: number;
}> = [
  {
    boxKey: '1',
    xUnit: 1,
    yUnit: 1,
  },
  {
    boxKey: '2',
    xUnit: 1,
    yUnit: 1,
  },
  {
    boxKey: '3',
    xUnit: 1,
    yUnit: 1,
  },
  {
    boxKey: '4',
    xUnit: 1,
    yUnit: 1,
  },
  {
    boxKey: '5',
    xUnit: 1,
    yUnit: 1,
  },
];

export default Grid;
