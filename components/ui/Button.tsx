import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'glass';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-on shadow-lg hover:shadow-primary/30',
  secondary: 'bg-secondary text-secondary-on shadow-lg hover:shadow-secondary/30',
  tertiary: 'bg-tertiary text-tertiary-on shadow-lg hover:shadow-tertiary/30',
  glass: 'bg-white/20 backdrop-blur-md border border-white/40 text-surface-on shadow-glass hover:bg-white/30',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || props.disabled}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-headline font-bold transition-all disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
