import toDecimal from './toDecimal';

/**
  Framerate-independent smoothing

  @param [number]: New value
  @param [number]: Old value
  @param [number]: Frame duration
  @param [number] (optional): Smoothing (0 is none)
*/
const smoothFrame = (
  prevValue: number,
  nextValue: number,
  duration: number,
  smoothing: number = 0
) =>
  toDecimal(
    prevValue + (duration * (nextValue - prevValue)) / Math.max(smoothing, duration)
  );

export default smoothFrame;
