import { Point } from '../types';
import isPoint from './isPoint';
import isPoint3D from './isPoint3D';
import { zeroPoint, isNum } from './num';

const distance1D = (a: number, b: number) => Math.abs(a - b);

// couldn't inline this below, because TS emitted declarations with wrong path references
type _Point = Point | number;

/**
  Distance

  Returns the distance between two n dimensional points.

  @param [object/number]: x and y or just x of point A
  @param [object/number]: (optional): x and y or just x of point B
  @return [number]: The distance between the two points
*/
const distance = (a: _Point, b: _Point = zeroPoint): number => {
  // 1D dimensions
  if (isNum(a) && isNum(b)) {
    return distance1D(a, b);

    // Multi-dimensional
  } else if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x);
    const yDelta = distance1D(a.y, b.y);
    const zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;

    return Math.sqrt(xDelta ** 2 + yDelta ** 2 + zDelta ** 2);
  }

  return 0;
};

export default distance;
