import { createContext } from 'react';

import { Position } from './types';
import noop from '../noop';

interface MoveContextShape {
  getCachedPosition: (id: string) => Position | null;
  updateCachedPosition: (id: string, position: Position) => void;
}

const MoveContext = createContext<MoveContextShape>({
  getCachedPosition: () => null,
  updateCachedPosition: noop,
});

export default MoveContext;
