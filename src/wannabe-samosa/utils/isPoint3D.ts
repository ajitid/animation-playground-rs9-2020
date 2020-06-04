import isPoint from './isPoint';
import { Point, Point3D } from '../types';

const isPoint3D = (point: Point): point is Point3D =>
  isPoint(point) && point.hasOwnProperty('z');

export default isPoint3D;
