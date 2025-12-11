import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwitchProps } from '../../types';

const sizeConfig = {
  sm: {
    track: 'w-8 h-5',
    thumb: 'w-3.5 h-3.5',
    padding: 2,
    text: 'text-xs',
  },
  md: {
    track: 'w-10 h-7',
    thumb: 'w-5 h-5',
    padding: 3,
    text: 'text-sm',
  },
  lg: {
    track: 'w-12 h-8',
    thumb: 'w-6 h-6',
    padding: 4,
    text: 'text-base',
  }
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  labelPosition = 'right',
  checkedIcon,
  uncheckedIcon,
  size = 'md',
  className = '',
  id,
}) => {
  const generatedId = useId();
  const switchId = id || generatedId;
  const styles = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {label && labelPosition === 'left' && (
        <label 
          htmlFor={switchId} 
          className={`font-medium text-text cursor-pointer select-none ${styles.text} ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={switchId}
          className="sr-only peer"
          checked={checked}
          onChange={(e) => !disabled && onCheckedChange(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          aria-label={label}
        />
        
        {/* Track */}
        <label 
          htmlFor={switchId}
          className={`
            ${styles.track} rounded-full transition-colors duration-300 
            flex items-center cursor-pointer border border-ui
            peer-focus-visible:ring-2 peer-focus-visible:ring-brand/20 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface
            ${checked ? 'bg-brand border-brand justify-end' : 'bg-surface-alt border-border justify-start'}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          style={{ paddingLeft: styles.padding, paddingRight: styles.padding }}
        >
          {/* Thumb */}
          <motion.div
            className={`
              ${styles.thumb} bg-surface rounded-full shadow-sm pointer-events-none flex items-center justify-center
              ${checked ? '' : 'shadow-sm border border-black/5'}
            `}
            layout
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.2,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {checked && checkedIcon ? (
                <motion.div
                  key="checked"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {checkedIcon}
                </motion.div>
              ) : !checked && uncheckedIcon ? (
                <motion.div
                  key="unchecked"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {uncheckedIcon}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </label>
      </div>
      
      {label && labelPosition === 'right' && (
        <label 
          htmlFor={switchId} 
          className={`font-medium text-text cursor-pointer select-none ${styles.text} ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};