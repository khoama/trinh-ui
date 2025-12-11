import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { NumberInputProps } from '../../types';
import { Minus, Plus } from 'lucide-react';

const sizeConfig = {
  sm: {
    btnSize: 'w-7 h-7',
    iconSize: 14,
    inputW: 'w-12',
    height: 'h-7',
    text: 'text-sm',
    rounded: 'rounded-ui-sm'
  },
  md: {
    btnSize: 'w-9 h-9',
    iconSize: 16,
    inputW: 'w-16',
    height: 'h-9',
    text: 'text-lg',
    rounded: 'rounded-ui-md'
  },
  lg: {
    btnSize: 'w-12 h-12',
    iconSize: 20,
    inputW: 'w-20',
    height: 'h-12',
    text: 'text-xl',
    rounded: 'rounded-ui-lg'
  }
};

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled,
  size = 'md'
}) => {
  const styles = sizeConfig[size];
  const inputId = useId();

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) return;
    onChange(Math.min(max, Math.max(min, val)));
  };

  return (
    <div className={`flex flex-col gap-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {label && <label htmlFor={inputId} className={`text-muted font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{label}</label>}
      
      <div className={`flex items-center gap-2 bg-surface-alt p-1.5 ${styles.rounded} w-fit border border-border border-ui shadow-sm transition-colors focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand`}>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--surface), 1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDecrement}
          disabled={value <= min || disabled}
          className={`${styles.btnSize} flex items-center justify-center ${styles.rounded} text-text hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
          aria-label="Decrease value"
          aria-controls={inputId}
        >
          <Minus size={styles.iconSize} strokeWidth={2.5} />
        </motion.button>

        <div className={`relative ${styles.inputW} ${styles.height} flex items-center justify-center`}>
          <input
            id={inputId}
            type="number"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full h-full text-center outline-none bg-transparent font-bold text-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${styles.text}`}
            aria-label={label || "Number input"}
            min={min}
            max={max}
            step={step}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--surface), 1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleIncrement}
          disabled={value >= max || disabled}
          className={`${styles.btnSize} flex items-center justify-center ${styles.rounded} text-text hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
          aria-label="Increase value"
          aria-controls={inputId}
        >
          <Plus size={styles.iconSize} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
};