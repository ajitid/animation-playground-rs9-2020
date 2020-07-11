import { useRef, useEffect } from 'react';

/**
 * Runs an effect when component is mounted
 */
const useOnMount = (fn: Function) => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return fn();
    }
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */
};

export default useOnMount;
