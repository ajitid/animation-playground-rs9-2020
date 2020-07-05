import React from 'react';

import { StyleProps, MoveStyles } from './types';
import useMove, { UseMoveShape } from './useMove';

type PickedUseMoveShape = Omit<UseMoveShape, 'addStyles'>;

interface MoveProps extends PickedUseMoveShape {
  style?: StyleProps;
}

const Move: React.FC<MoveProps> = ({ children, style, ...props }) => {
  const child = React.Children.only(children);

  const childProps = useMove({ ...props, addStyles: style as MoveStyles });

  if (!React.isValidElement(child)) return null;

  return React.cloneElement(child, {
    childProps,
    style,
  });
};

export default Move;
