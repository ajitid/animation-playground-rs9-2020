import React from 'react';
import { Link as RLink, LinkProps } from 'react-router-dom';

/**
 * A link that is styled to look like a button
 */
const LinkAsButton: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <RLink {...props} className="text-brand-blue-700 bg-brand-blue-300 px-3 py-2 rounded">
      {children}
    </RLink>
  );
};

export default LinkAsButton;
