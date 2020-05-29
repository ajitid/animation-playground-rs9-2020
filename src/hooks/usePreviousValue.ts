import { useRef } from 'react';

const usePreviousValue = <T extends unknown>(newValue: T) => {
  const previousValueRef = useRef(newValue);
  const newValueRef = useRef(newValue);
  if (!Object.is(newValue, newValueRef.current)) {
    previousValueRef.current = newValueRef.current;
    newValueRef.current = newValue;
  }
  return previousValueRef.current;
};

export default usePreviousValue;
