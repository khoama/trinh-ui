import React, { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { SliderProps } from '../../types';

const sizeConfig = {
  sm: {
    trackHeight: 'h-1',
    handleSize: 'w-4 h-4',
    text: 'text-xs'
  },
  md: {
    trackHeight: 'h-2',
    handleSize: 'w-5 h-5',
    text: 'text-sm'
  },
  lg: {
    trackHeight: 'h-3',
    handleSize: 'w-7 h-7',
    text: 'text-base'
  }
};

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  disabled = false,
  size = 'md'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate percentage for visual track
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  // Spring for the handle scale animation
  const handleScale = useSpring(1, { stiffness: 300, damping: 20 });
  const styles = sizeConfig[size];
  
  // Update handle scale based on interaction state
  React.useEffect(() => {
    if (isDragging) handleScale.set(1.3);
    else if (isHovered || isFocused) handleScale.set(1.1);
    else handleScale.set(1);
  }, [isDragging, isHovered, isFocused, handleScale]);

  return (
    <div className={`w-full flex flex-col gap-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-end">
        {label && (
          <label className={`text-muted font-medium ${styles.text}`}>
            {label}
          </label>
        )}
        <span className={`text-text font-bold tabular-nums ${styles.text}`}>
          {value}
        </span>
      </div>

      <div 
        className={`relative w-full flex items-center group py-2`} 
        style={{ minHeight: '2rem' }} // ensure touch target
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Background Track */}
        <div aria-hidden="true" className={`absolute w-full ${styles.trackHeight} bg-surface-alt rounded-full overflow-hidden`}>
          {/* Active Fill Track */}
          <motion.div 
            className="h-full bg-brand"
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          />
        </div>

        {/* Visual Handle */}
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ left: `${percentage}%` }}
          initial={false}
          animate={{ left: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          <motion.div
            style={{ scale: handleScale }}
            className={`
              ${styles.handleSize} bg-surface border-2 border-brand rounded-full shadow-md
              transition-shadow duration-200
              ${isFocused ? 'ring-4 ring-brand/20' : ''}
            `}
          />
        </motion.div>

        {/* Native Input for Accessibility and Interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          aria-label={label || "Slider"}
        />
      </div>
    </div>
  );
};