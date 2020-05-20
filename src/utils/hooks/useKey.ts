import { useRef } from 'react';
import { nanoid } from 'nanoid';

const useKey = () => {
  const keyRef = useRef(nanoid());

  const generateNewKey = () => {
    keyRef.current = nanoid();
  };

  return {
    keyRef,
    generateNewKey,
  };
};

export default useKey;
