import React, { ReactElement } from 'react';

const DragHandle: React.FC = ({ children }) => {
  try {
    const child = React.Children.only(children);
    if (!React.isValidElement(child)) return null;
    const el = child as ReactElement;

    return React.cloneElement(el, {
      // @ts-ignore
      'data-grid-item-drag-handle': true,
    });
  } catch (e) {
    return null;
  }
};

export default DragHandle;
