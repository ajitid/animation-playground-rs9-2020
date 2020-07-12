import { RefObject } from 'react';

export const inDevelopment = () => process.env.NODE_ENV === 'development';

export const noop = () => {};

// use as `logWithOr(valueToLog) || {a: 1}`
export const logWithOr = (...v: any[]) => {
  console.log(...v);
  return false;
};

export function mergeRefs(refs: Array<unknown>) {
  return (value: unknown) => {
    refs.forEach((ref: any) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
