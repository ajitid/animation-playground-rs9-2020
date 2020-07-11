import React, { useState } from 'react';
import { a as ani, useTransition } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

import PackingGrid from './PackingGrid';
import Item from './Item';
import DragHandle from './DragHandle';

const Grid: React.FC = () => {
  const l = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [show, setShow] = useState(false);
  const [showAnother, setShowAnother] = useState(false);
  const toggleShow = () => {
    setShow(s => !s);
  };
  const toggleShowAnother = () => {
    setShowAnother(s => !s);
  };

  return (
    <DefaultLayout pageTitle="Grid">
      <div className="container mx-auto pt-4">
        <div>
          <button onClick={toggleShow}>show</button>
        </div>
        <div>
          <button onClick={toggleShowAnother}>show another</button>
        </div>
        <PackingGrid>
          {/* {l.map(x => ( */}
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">1</div>
          </Item>
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">
              2
              <DragHandle>
                <div className="w-2 h-2 bg-pink-400" />
              </DragHandle>
            </div>
          </Item>
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">3</div>
          </Item>
          <Item>
            <div className="bg-green-400 w-24 h-8 m-4">4</div>
          </Item>
          {/* 2 */}
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">5</div>
          </Item>
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">6</div>
          </Item>
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">7</div>
          </Item>
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">8</div>
          </Item>
          {/* 3 */}
          <Item>
            <div className="bg-green-400 w-8 h-8 m-4">9</div>
          </Item>
          {show && (
            <Item>
              <div className="bg-green-400 w-8 h-8 m-4">10</div>
            </Item>
          )}
          {showAnother && (
            <Item>
              <div className="bg-green-400 w-8 h-8 m-4">11</div>
            </Item>
          )}
        </PackingGrid>
      </div>
    </DefaultLayout>
  );
};

export default Grid;
