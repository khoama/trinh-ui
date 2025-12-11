import React, { useState, useId, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextareaProps } from '../../types';

const sizeConfig = {
  sm: {
    text: 'text-sm',
    padding: 'px-3',
    rounded: 'rounded-ui-sm',
    labelInitialLeft: 'left-3',
    labelInitialTop: 'top-3',
    labelActiveY: -6,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-6 pb-2',
    noLabelPadding: 'py-2',
  },
  md: {
    text: 'text-base',
    padding: 'px-4',
    rounded: 'rounded-ui-md',
    labelInitialLeft: 'left-4',
    labelInitialTop: 'top-3.5',
    labelActiveY: -8,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-7 pb-3',
    noLabelPadding: 'py-3.5',
  },
  lg: {
    text: 'text-lg',
    padding: 'px-5',
    rounded: 'rounded-ui-lg',
    labelInitialLeft: 'left-5',
    labelInitialTop: 'top-4',
    labelActiveY: -10,
    labelActiveScale: 0.75,
    withLabelPadding: 'pt-8 pb-4',
    noLabelPadding: 'py-4',
  }
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  onFocus,
  onBlur,
  onChange,
  value,
  disabled,
  size = 'md',
  autoResize = false,
  rows = 3,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  
  const isActive = isFocused || (value !== undefined && value !== '');
  const styles = sizeConfig[size];

  // Auto-resize logic
  useEffect(() => {
    if (!autoResize || !textareaRef.current) return;
    
    const textarea = textareaRef.current;
    // Reset height to auto to correctly calculate scrollHeight (shrink if needed)
    textarea.style.height = 'auto';
    // Set new height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value, autoResize]);

  return (
    <div className={`flex flex-col gap-1 w-full ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative group isolation-auto">
        {/* Animated Focus Glow / Ring */}
        <motion.div
          initial={false}
          animate={{
            scale: isFocused && !disabled ? 1.02 : 1,
            opacity: isFocused && !disabled ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            absolute inset-0 -z-10 pointer-events-none
            ${styles.rounded}
            ${error ? 'bg-error/5 ring-2 ring-error/20' : 'bg-brand/5 ring-4 ring-brand/10'}
          `}
        />

        <textarea
          ref={textareaRef}
          id={inputId}
          value={value}
          disabled={disabled}
          rows={rows}
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
          onChange={onChange}
          className={`
            w-full bg-transparent outline-none border-ui relative z-0
            transition-all duration-200
            ${styles.text} ${styles.rounded} ${styles.padding}
            ${label 
              ? `${styles.withLabelPadding} placeholder:opacity-0 focus:placeholder:opacity-30` 
              : `${styles.noLabelPadding} placeholder:text-muted/50`
            }
            ${error 
              ? 'border-error text-error focus:ring-2 focus:ring-error/20' 
              : 'border-border text-text focus:border-brand focus:ring-2 focus:ring-brand/20 hover:border-brand/50'
            }
            ${disabled ? 'cursor-not-allowed bg-surface-alt/30' : ''}
            ${autoResize ? 'resize-none' : 'resize-y'}
          `}
          {...props}
        />
        
        {label && (
          <motion.label
            htmlFor={inputId}
            initial={false}
            animate={{
              y: isActive ? styles.labelActiveY : 0,
              x: isActive ? 0 : 0,
              scale: isActive ? styles.labelActiveScale : 1,
              originX: 0,
              originY: 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              absolute ${styles.labelInitialTop} ${styles.labelInitialLeft} cursor-text font-medium pointer-events-none z-10
              transition-colors duration-200
              ${styles.text}
              ${error ? 'text-error' : isFocused ? 'text-brand' : 'text-muted'}
            `}
          >
            {label}
          </motion.label>
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
            aria-live="polite"
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