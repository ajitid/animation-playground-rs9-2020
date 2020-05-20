import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Icon } from 'react-feather';

// interface ButtonProps extends HTMLMotionProps<'button'> {
// `React.ButtonHTMLAttributes<HTMLButtonElement>` will infer all properties of an HTML button element
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // cta - call to action
  kind?: 'default' | 'accent';
  fullWidth?: boolean;
  loading?: boolean;
  LeftIcon?: Icon;
  RightIcon?: Icon;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      kind = 'default',
      LeftIcon,
      RightIcon,
      fullWidth = false,
      loading = false,
      disabled,
      className,
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(className, 'px-3 py-2 rounded', {
      'w-full': fullWidth,
      'text-brand-blue-700 bg-brand-blue-300': kind === 'default',
      'bg-brand-blue-700 text-white': kind === 'accent',
    });

    return (
      <button
        type={type}
        disabled={disabled || loading}
        style={{ outline: 'none', ...style }}
        className={classes}
        ref={ref}
        {...props}
      >
        {LeftIcon && <LeftIcon size={16} className="mr-2" />}
        {children}
        {RightIcon && <RightIcon size={16} className="ml-2" />}
      </button>
    );
  }
);

export default Button;
