import React from 'react';
import { Link as RLink, LinkProps } from 'react-router-dom';

// TODO forward ref
// import { Link as RLink, LinkProps } from 'react-router-dom';
// const Link = forwardRef<RLink, LinkProps>(({ children, ...props }, ref) => {

/**
 * Wrapper around `react-router-dom` Link component
 */
const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <RLink {...props} className="text-brand-blue-700">
      {children}
    </RLink>
  );
};

export default Link;
