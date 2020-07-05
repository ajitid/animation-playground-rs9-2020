import curryRange from './curryRange';

const _clamp = (min: number, max: number, v: number) => Math.min(Math.max(v, min), max);

export default curryRange(_clamp);
