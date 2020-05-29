export const inDevelopment = () => process.env.NODE_ENV === 'development';

export const noop = () => {};

// use as `logWithOr(valueToLog) || {a: 1}`
export const logWithOr = (...v: any[]) => {
  console.log(...v);
  return false;
};
