import React, { useState, useEffect, useRef } from 'react';
import { a, useTransition } from '@react-spring/web';
import { useMove } from 'react-use-gesture';
import { nanoid } from 'nanoid';

import DefaultLayout from 'layouts/DefaultLayout';
import { createExpoIn, reversed } from 'wannabe-samosa/utils/easings';
import pointDist from 'wannabe-samosa/utils/distance';
import wrap from 'wannabe-samosa/utils/wrap';

// recreated https://twitter.com/mattgperry/status/1159116421080788992
// TODO need to fix animation, creates element with mouse pointer
// as top left and not in center

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

  const previousImagePointRef = useRef([0, 0]);
  const lastZIndex = useRef(0);

  const bindMove = useMove(
    ({ xy, last, vxvy }) => {
      if (
        pointDist(
          {
            x: xy[0],
            y: xy[1],
          },
          { x: previousImagePointRef.current[0], y: previousImagePointRef.current[1] }
        ) > 140
      ) {
        previousImagePointRef.current = xy;
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
    from: item => ({
      // scale: 0.8,
      opacity: 0.4,
      x: item.xy[0],
      y: item.xy[1],
    }),
    enter: item => ({
      scale: 1,
      opacity: 1,
      x: item.vxvy[0] * 90 + item.xy[0],
      y: item.vxvy[1] * 90 + item.xy[1],
      duration: 4000,
    }),
    leave: {
      scale: 0,
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
    config: {
      easing: powerOut4,
    },
  });

  const imagesToRender = imagesTransition((style, img) => (
    <a.div
      key={img.id}
      style={{
        ...style,
        // transform: `translate(-50%, -50%)`,
        // transformOrigin: '50% 50% 0',
        background: img.color,
      }}
      className="w-48 h-64 absolute inline-block"
    />
  ));

  return (
    <DefaultLayout pageTitle="Image trail">
      <div className="mx-auto relative h-screen overflow-hidden">{imagesToRender}</div>
    </DefaultLayout>
  );
};

// Version of Greensock's Quad ease out
export const powerOut4 = reversed(createExpoIn(4));

const placeholderColors: Set<string> = new Set();
for (let i = 0; i < 30; i++) {
  placeholderColors.add(`hsla(${Math.round(Math.random() * 360)},100%,70%,1)`);
}
const colors = Array.from(placeholderColors);

const setupGetColor = () => {
  let colorIdx = -1;
  return () => {
    colorIdx = wrap(0, colors.length, colorIdx + 1);
    return colors[colorIdx];
  };
};

export default ImageTrail;
