import { useRef, useEffect } from 'react';

/**
 * Runs an effect when component is mounted
 */
const useOnMount = (fn: () => void) => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      fn();
    }
  }, [fn]);
};

export default useOnMount;
