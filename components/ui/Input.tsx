import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { InputProps, Size } from '../../types';

const sizeConfig = {
  sm: {
    text: 'text-sm',
    padding: 'px-3',
    paddingRightOverride: 'pr-9',
    height: 'py-2',
    rounded: 'rounded-ui-sm',
    labelInitial: 'left-3',
    labelActiveY: -16,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-5 pb-1',
    noLabelPadding: 'py-2',
    iconSize: 16,
  },
  md: {
    text: 'text-base',
    padding: 'px-4',
    paddingRightOverride: 'pr-11',
    height: 'py-3.5',
    rounded: 'rounded-ui-md',
    labelInitial: 'left-4',
    labelActiveY: -20,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-6 pb-2',
    noLabelPadding: 'py-3.5',
    iconSize: 18,
  },
  lg: {
    text: 'text-lg',
    padding: 'px-5',
    paddingRightOverride: 'pr-12',
    height: 'py-4',
    rounded: 'rounded-ui-lg',
    labelInitial: 'left-5',
    labelActiveY: -24,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-7 pb-3',
    noLabelPadding: 'py-4',
    iconSize: 20,
  }
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  onFocus,
  onBlur,
  value,
  disabled,
  size = 'md',
  type,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  
  const isPassword = type === 'password';
  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Check if floating label should be active
  const isActive = isFocused || (value !== undefined && value !== '');
  const styles = sizeConfig[size];

  return (
    <div className={`flex flex-col gap-1 w-full ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative group">
        <input
          id={inputId}
          type={currentType}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={`
            w-full bg-transparent outline-none border-ui
            transition-all duration-200
            ${styles.text} ${styles.rounded} ${styles.padding}
            ${isPassword ? styles.paddingRightOverride : ''}
            ${label 
              ? `${styles.withLabelPadding} placeholder:opacity-0 focus:placeholder:opacity-30` 
              : `${styles.noLabelPadding} placeholder:text-muted/50`
            }
            ${error 
              ? 'border-error text-error focus:ring-2 focus:ring-error/20' 
              : 'border-border text-text focus:border-brand focus:ring-2 focus:ring-brand/20 hover:border-brand/50'
            }
            ${disabled ? 'cursor-not-allowed bg-surface-alt/30' : ''}
          `}
          {...props}
        />
        
        {label && (
          <motion.label
            htmlFor={inputId}
            initial={false}
            animate={{
              y: isActive ? styles.labelActiveY : "-50%",
              scale: isActive ? styles.labelActiveScale : 1,
              originX: 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              absolute top-1/2 ${styles.labelInitial} cursor-text font-medium pointer-events-none
              transition-colors duration-200
              ${styles.text}
              ${error ? 'text-error' : isFocused ? 'text-brand' : 'text-muted'}
            `}
          >
            {label}
          </motion.label>
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`
              absolute right-3 top-1/2 -translate-y-1/2
              text-muted hover:text-text
              p-1.5 rounded-md
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-brand/20
            `}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={styles.iconSize} /> : <Eye size={styles.iconSize} />}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-error text-sm font-medium overflow-hidden pl-1"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            id={helperId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted text-sm overflow-hidden pl-1"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};