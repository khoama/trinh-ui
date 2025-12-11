import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { DatePickerProps, DateRange } from '../../types';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const sizeConfig = {
  sm: {
    padding: 'p-2',
    text: 'text-sm',
    iconSize: 16,
    rounded: 'rounded-ui-sm',
    compactSize: 'w-8 h-8'
  },
  md: {
    padding: 'p-3',
    text: 'text-base',
    iconSize: 18,
    rounded: 'rounded-ui-md',
    compactSize: 'w-10 h-10'
  },
  lg: {
    padding: 'p-4',
    text: 'text-lg',
    iconSize: 20,
    rounded: 'rounded-ui-lg',
    compactSize: 'w-12 h-12'
  }
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  mode = 'single',
  minDate,
  maxDate,
  disabled = false,
  disabledDates,
  size = 'md',
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initial view based on value (start date if range) or today
  const initialDate = value 
    ? (mode === 'range' ? (value as DateRange).from || new Date() : (value as Date)) 
    : new Date();
    
  const [viewDate, setViewDate] = useState(initialDate || new Date());
  const [direction, setDirection] = useState(0);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = sizeConfig[size];

  // Close when clicking outside (only for popup variants)
  useEffect(() => {
    if (variant === 'inline') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  // Update view when value changes externally
  useEffect(() => {
    if (value) {
      if (mode === 'single' && value instanceof Date) {
        setViewDate(value);
      } else if (mode === 'range' && (value as DateRange).from) {
        setViewDate((value as DateRange).from!);
      }
    }
  }, [value, mode]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (increment: number) => {
    setDirection(increment);
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setViewDate(newDate);
  };

  const isDateEqual = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const checkIsDisabled = (date: Date) => {
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(0, 0, 0, 0);
      if (date > max) return true;
    }

    if (!disabledDates) return false;
    
    if (Array.isArray(disabledDates)) {
      return disabledDates.some(d => isDateEqual(d, date));
    }
    
    if (typeof disabledDates === 'function') {
      return disabledDates(date);
    }

    return false;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    
    if (checkIsDisabled(clickedDate)) return;

    if (mode === 'single') {
      onChange(clickedDate);
      if (variant !== 'inline') setIsOpen(false);
    } else {
      const currentRange = (value as DateRange) || { from: null, to: null };
      
      if (!currentRange.from || (currentRange.from && currentRange.to)) {
        onChange({ from: clickedDate, to: null });
      } else {
        if (clickedDate < currentRange.from) {
          onChange({ from: clickedDate, to: currentRange.from });
        } else {
          onChange({ from: currentRange.from, to: clickedDate });
        }
        if (variant !== 'inline') setIsOpen(false);
      }
    }
  };

  const formatDate = (val: Date | DateRange | null) => {
    if (!val) return '';
    
    const format = (d: Date) => d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });

    if (mode === 'single') {
      return val instanceof Date ? format(val) : '';
    } else {
      const range = val as DateRange;
      if (!range.from) return '';
      if (!range.to) return format(range.from);
      return `${format(range.from)} - ${format(range.to)}`;
    }
  };

  const getDayState = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const isDisabled = checkIsDisabled(date);
    const today = new Date();
    const isToday = isDateEqual(date, today);

    if (mode === 'single') {
      const isSelected = value instanceof Date && isDateEqual(date, value);
      return { isSelected, isToday, isInRange: false, isRangeStart: false, isRangeEnd: false, isDisabled };
    } else {
      const range = (value as DateRange) || { from: null, to: null };
      let start = range.from;
      let end = range.to;

      if (range.from && !range.to && hoverDate) {
         if (hoverDate < range.from) {
             start = hoverDate;
             end = range.from;
         } else {
             start = range.from;
             end = hoverDate;
         }
      } else if (range.from && range.to) {
          if (range.from > range.to) {
              start = range.to;
              end = range.from;
          }
      }

      const isRangeStart = isDateEqual(date, start);
      const isRangeEnd = isDateEqual(date, end);
      
      let isInRange = false;
      if (start && end && !isDisabled) {
        const d = new Date(date).setHours(0,0,0,0);
        const s = new Date(start).setHours(0,0,0,0);
        const e = new Date(end).setHours(0,0,0,0);
        isInRange = d > s && d < e;
      }

      return { isSelected: isRangeStart || isRangeEnd, isToday, isInRange, isRangeStart, isRangeEnd, isDisabled };
    }
  };

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

  // Render content of the calendar
  const CalendarContent = () => (
    <div 
      className={`
        ${variant === 'inline' ? 'w-full' : 'w-full min-w-[320px]'}
        p-4 bg-surface rounded-ui-lg border-ui
        ${variant === 'inline' ? 'border-border' : 'border-border shadow-xl'}
        overflow-hidden
      `}
      role={variant !== 'inline' ? "dialog" : undefined}
      aria-modal={variant !== 'inline' ? "true" : undefined}
      aria-label="Calendar"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={(e) => { e.stopPropagation(); changeMonth(-1); }}
          className="p-1 rounded-full hover:bg-surface-alt text-text transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        
        <span className="font-bold text-text text-lg" aria-live="polite">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        
        <button 
          onClick={(e) => { e.stopPropagation(); changeMonth(1); }}
          className="p-1 rounded-full hover:bg-surface-alt text-text transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2" role="row">
        {DAYS.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-muted uppercase tracking-wider" role="columnheader">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <motion.div
        key={viewDate.toISOString()}
        initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
        className="grid grid-cols-7 gap-y-1"
        role="grid"
        onMouseLeave={() => setHoverDate(null)}
      >
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} role="presentation" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const { isSelected, isToday, isInRange, isRangeStart, isRangeEnd, isDisabled } = getDayState(day);
          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          
          return (
            <div 
              key={day} 
              className="relative h-9 w-full flex items-center justify-center"
              role="gridcell"
              onMouseEnter={() => {
                if (mode === 'range' && !isDisabled) {
                  setHoverDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
                }
              }}
            >
              {mode === 'range' && !isDisabled && (
                  <>
                    {isInRange && <div aria-hidden="true" className="absolute inset-y-0 left-0 right-0 bg-brand/10" />}
                    {isRangeStart && !isRangeEnd && <div aria-hidden="true" className="absolute inset-y-0 right-0 left-1/2 bg-brand/10" />}
                    {isRangeEnd && !isRangeStart && <div aria-hidden="true" className="absolute inset-y-0 left-0 right-1/2 bg-brand/10" />}
                  </>
              )}

              <motion.button
                onClick={(e) => { e.stopPropagation(); handleDateClick(day); }}
                whileTap={!isDisabled ? { scale: 0.9 } : undefined}
                disabled={isDisabled}
                aria-label={date.toDateString()}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                aria-current={isToday ? 'date' : undefined}
                className={`
                  relative w-9 h-9 flex items-center justify-center rounded-ui-sm text-sm font-medium transition-all z-10
                  ${isDisabled
                      ? 'text-muted/30 cursor-not-allowed line-through decoration-muted/30'
                      : isSelected 
                        ? 'bg-brand text-surface shadow-sm' 
                        : isToday 
                          ? 'bg-surface-alt text-brand border border-brand/30'
                          : isInRange
                            ? 'text-brand'
                            : 'text-text hover:bg-surface-alt'
                  }
                `}
              >
                {day}
                {isToday && !isSelected && !isInRange && !isDisabled && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-brand" />
                )}
              </motion.button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );

  return (
    <div className={`relative w-full flex flex-col gap-1 ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={containerRef}>
      {label && variant !== 'inline' && (
        <label className={`text-muted font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ml-1`}>{label}</label>
      )}
      
      {/* Inline Variant - Render Calendar Directly */}
      {variant === 'inline' ? (
        <CalendarContent />
      ) : (
        <>
          {/* Default or Compact Trigger */}
          <div 
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`
              flex items-center cursor-pointer transition-all duration-200 group border-ui
              ${variant === 'compact' 
                ? `${styles.compactSize} justify-center rounded-full border border-border hover:bg-surface-alt ${isOpen ? 'bg-brand text-surface border-brand hover:bg-brand' : 'bg-surface text-text'}` 
                : `${styles.padding} ${styles.rounded} justify-between gap-3 border ${isOpen ? 'border-brand ring-2 ring-brand/10 bg-surface' : 'border-border bg-surface-alt hover:bg-surface'}`
              }
            `}
            role="button"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label={label || "Choose date"}
            title={value ? formatDate(value) : placeholder}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                !disabled && setIsOpen(!isOpen);
              }
            }}
          >
            {variant === 'default' && (
              <span className={`font-medium truncate ${styles.text} ${value ? 'text-text' : 'text-muted/70'}`}>
                {value ? formatDate(value) : placeholder}
              </span>
            )}
            
            <div className={`flex items-center gap-2 ${variant === 'compact' ? '' : ''}`}>
               {/* Clear button - only default mode */}
               {variant === 'default' && value && !disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(mode === 'single' ? null : { from: null, to: null });
                  }}
                  className="text-muted hover:text-text opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  aria-label="Clear date"
                >
                  <X size={14} />
                </button>
              )}
              <CalendarIcon 
                size={styles.iconSize} 
                className={`shrink-0 ${variant === 'compact' && isOpen ? 'text-surface' : variant === 'compact' ? 'text-text' : 'text-brand'}`} 
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Popover */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="absolute top-full left-0 mt-2 z-50"
              >
                <CalendarContent />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};