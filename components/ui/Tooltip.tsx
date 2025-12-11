import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProps } from '../../types';

const placementConfig = {
  top: {
    initial: { opacity: 0, y: 5, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 5, scale: 0.95 },
    position: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-text rotate-45'
  },
  bottom: {
    initial: { opacity: 0, y: -5, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -5, scale: 0.95 },
    position: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-text rotate-45'
  },
  left: {
    initial: { opacity: 0, x: 5, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 5, scale: 0.95 },
    position: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-text rotate-45'
  },
  right: {
    initial: { opacity: 0, x: -5, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -5, scale: 0.95 },
    position: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-text rotate-45'
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 200,
  placement = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const styles = placementConfig[placement];

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={styles.initial}
            animate={styles.animate}
            exit={styles.exit}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              absolute z-50 px-3 py-1.5 
              text-xs font-medium text-surface bg-text rounded-md shadow-lg whitespace-nowrap
              pointer-events-none flex items-center justify-center
              ${styles.position}
            `}
            role="tooltip"
          >
            {content}
            {/* Rotated Square Arrow */}
            <div className={`absolute ${styles.arrow}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
