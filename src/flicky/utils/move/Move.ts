import React from 'react';

import { StyleProps, MoveStyles } from './types';
import useMove, { UseMoveShape } from './useMove';

type PickedUseMoveShape = Omit<UseMoveShape, 'addStyles' | 'key'>;

interface MoveProps extends PickedUseMoveShape {
  moveKey: string;
  style?: StyleProps;
}

const Move: React.FC<MoveProps> = ({ children, style, moveKey, ...props }) => {
  const child = React.Children.only(children);

  const childProps = useMove({ ...props, key: moveKey, addStyles: style as MoveStyles });

  if (!React.isValidElement(child)) return null;

  return React.cloneElement(child, {
    ...childProps,
    style: {
      ...style,
      ...childProps.style,
    },
  });
};

export default Move;
