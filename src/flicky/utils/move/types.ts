import { CSSProperties } from 'react';
import { Merge } from '@react-spring/shared';

export interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface MoveStyles {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface MoveStylesOptional {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
}

export type StyleProps = Merge<CSSProperties, TransformProps>;

type Angle = number | string;
type Length = number | string;
type TransformProps = {
  transform?: string;
  x?: Length;
  y?: Length;
  z?: Length;
  translate?: Length | readonly [Length, Length];
  translateX?: Length;
  translateY?: Length;
  translateZ?: Length;
  translate3d?: readonly [Length, Length, Length];
  rotate?: Angle;
  rotateX?: Angle;
  rotateY?: Angle;
  rotateZ?: Angle;
  rotate3d?: readonly [number, number, number, Angle];
  scale?: number | readonly [number, number] | string;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  scale3d?: readonly [number, number, number];
  skew?: Angle | readonly [Angle, Angle];
  skewX?: Angle;
  skewY?: Angle;
  matrix?: readonly [number, number, number, number, number, number];
  matrix3d?: readonly [
    number, // a1
    number,
    number,
    number,
    number, // a2
    number,
    number,
    number,
    number, // a3
    number,
    number,
    number,
    number, // a4
    number,
    number,
    number
  ];
};
