import React, { useRef } from 'react';

import { Position } from './types';
import MoveContext from './MoveContext';

const MoveProvider: React.FC = ({ children }) => {
  const cachedPositionsRef = useRef<Record<string, Position>>({});

  const updateCachedPosition = (id: string | number, position: Position) => {
    cachedPositionsRef.current = {
      ...cachedPositionsRef.current,
      [id]: { ...position },
    };
  };

  const getCachedPosition = (id: string | number) => {
    return cachedPositionsRef.current[id] ?? null;
  };

  return (
    <MoveContext.Provider
      value={{ getCachedPosition, updateCachedPosition }}
      children={children}
    />
  );
};

export default MoveProvider;
