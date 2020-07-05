import { isNum } from './num';

/**
  Convert x per second to per frame velocity based on fps

  @param xps Unit per second
  @param progress Frame duration in ms
*/
const velocityPerFrame = (xps: number, frameDuration: number) =>
  isNum(xps) ? xps / (1000 / frameDuration) : 0;

export default velocityPerFrame;
