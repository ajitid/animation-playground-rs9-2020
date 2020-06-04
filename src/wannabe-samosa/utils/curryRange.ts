export type RangeFunction = (min: number, max: number, v: number) => any;

const curryRange = (func: RangeFunction) => (min: number, max: number, v?: number) =>
  v !== undefined ? func(min, max, v) : (cv: number) => func(min, max, cv);

export default curryRange;
