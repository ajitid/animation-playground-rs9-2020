import { createContext } from 'react';

import { Position } from './types';
import noop from '../noop';

interface MoveContextShape {
  getCachedPosition: (id: string) => Position;
  updateCachedPosition: (id: string, position: Position) => void;
}

const MoveContext = createContext<MoveContextShape>({
  getCachedPosition: () => ({ width: 0, height: 0, top: 0, left: 0 }),
  updateCachedPosition: noop,
});

export default MoveContext;
