import { createContext } from 'react';

import { Position } from './types';
import noop from '../utils/noop';

interface MoveContextShape {
  getCachedPosition: (id: string | number) => Position | null;
  updateCachedPosition: (id: string | number, position: Position) => void;
}

const MoveContext = createContext<MoveContextShape>({
  getCachedPosition: () => null,
  updateCachedPosition: noop,
});

export default MoveContext;
