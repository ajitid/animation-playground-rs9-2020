import React, { useState, useEffect, useRef } from 'react';
import { a, useTransition } from '@react-spring/web';
import { useMove } from 'react-use-gesture';
import { distance as pointDist } from '@popmotion/popcorn';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';

const setupGetColor = () => {
  // from https://yeun.github.io/open-color/
  const colors = [
    '#ff6b6b',
    '#f06595',
    '#be4bdb',
    '#7950f2',
    '#15aabf',
    '#12b886',
    '#fcc419',
  ];
  let previousColorIdx = -1;
  return () => {
    const currentColorIdx = (previousColorIdx + 1) % colors.length;
    previousColorIdx = currentColorIdx;
    return colors[currentColorIdx];
  };
};

interface ImageShape {
  id: string;
  zIndex: number;
  xy: [number, number];
  vxvy: [number, number];
  color: string;
}

const ImageTrail = () => {
  const getColorRef = useRef(setupGetColor());

  const [images, setImages] = useState<Array<ImageShape>>([]);

  const previousPointRef = useRef([0, 0]);
  const lastZIndex = useRef(0);

  const bindMove = useMove(
    ({ xy, last, vxvy }) => {
      if (
        pointDist(
          {
            x: xy[0],
            y: xy[1],
          },
          { x: previousPointRef.current[0], y: previousPointRef.current[1] }
        ) > 50
      ) {
        previousPointRef.current = xy;
        const color = getColorRef.current();
        lastZIndex.current += 1;
        const zIndex = lastZIndex.current;
        setImages(prevImages => {
          const images = [...prevImages];
          images.push({
            id: nanoid(),
            zIndex,
            xy,
            vxvy,
            color,
          });
          return images;
        });
      }
      // last && console.log('last');
    },
    { domTarget: window }
  );

  useEffect(bindMove, [bindMove]);

  const imagesTransition = useTransition(images, {
    from: {
      scale: 0.8,
      opacity: 0.4,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 1,
      opacity: 0,
    },
    onRest: (data, state) => {
      const id = state.item.id;
      if (!id) return;
      setImages(prevImages => {
        const images = [...prevImages];
        images.splice(
          images.findIndex(img => img.id === id),
          1
        );
        return images;
      });
    },
  });

  const imagesToRender = imagesTransition((style, img) => (
    <a.div
      key={img.id}
      style={{ ...style, x: img.xy[0], y: img.xy[1], background: img.color }}
      className="w-64 h-64 absolute inline-block"
    />
  ));

  return (
    <DefaultLayout pageTitle="From state">
      <div className="mx-auto relative h-screen overflow-hidden">{imagesToRender}</div>
    </DefaultLayout>
  );
};

export default ImageTrail;
