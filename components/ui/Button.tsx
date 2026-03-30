"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'glass';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary shadow-lg hover:shadow-primary/30',
  secondary: 'bg-secondary text-on-secondary shadow-lg hover:shadow-secondary/30',
  tertiary: 'bg-tertiary text-on-tertiary shadow-lg hover:shadow-tertiary/30',
  glass: 'bg-white/20 backdrop-blur-md border border-white/40 text-on-surface shadow-glass hover:bg-white/30',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-headline font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
