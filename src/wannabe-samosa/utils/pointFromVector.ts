import { Point2D } from '../types';
import degreesToRadians from './degreesToRadians';

/**
  Point from angle and distance.
  Also known as pointFromAngleAndDistance.
 
  @param origin 2D point of origin
  @param angle Angle from origin
  @param distance Distance from origin
  @return Calculated 2D point
*/
const pointFromVector = (origin: Point2D, angle: number, distance: number) => {
  angle = degreesToRadians(angle);

  return {
    x: distance * Math.cos(angle) + origin.x,
    y: distance * Math.sin(angle) + origin.y,
  };
};

export default pointFromVector;
