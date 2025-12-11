import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { DropdownProps, Size } from '../../types';
import { ScrollPanel } from './ScrollPanel';

const sizeConfig = {
  sm: {
    height: 'min-h-[32px]',
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    iconSize: 16,
    rounded: 'rounded-ui-sm',
    labelInitial: 'left-3',
    optionPad: 'px-3 py-2'
  },
  md: {
    height: 'min-h-[44px]',
    padding: 'px-4 py-2.5',
    text: 'text-base',
    iconSize: 20,
    rounded: 'rounded-ui-md',
    labelInitial: 'left-4',
    optionPad: 'px-4 py-2.5'
  },
  lg: {
    height: 'min-h-[52px]',
    padding: 'px-5 py-3',
    text: 'text-lg',
    iconSize: 24,
    rounded: 'rounded-ui-lg',
    labelInitial: 'left-5',
    optionPad: 'px-5 py-3'
  }
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  label,
  placeholder = "Select option",
  searchable = false,
  disabled = false,
  error,
  helperText,
  size = 'md',
  className = '',
  minWidth = 200
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const styles = sizeConfig[size];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  // Manage Highlighted Index on Open/Search/Value Change
  useEffect(() => {
    if (isOpen) {
      if (searchQuery) {
        // If searching, highlight first result
        setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
      } else {
        // If not searching, try to highlight the selected value (Single selection)
        if (!multiple && value !== null && value !== undefined) {
          const index = filteredOptions.findIndex(opt => opt.value === value);
          setHighlightedIndex(index);
        } else {
          setHighlightedIndex(-1);
        }
      }
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, searchQuery, value, multiple, filteredOptions]);

  // Scroll to highlighted item
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && scrollRef.current) {
      const container = scrollRef.current;
      const optionsNodes = container.children;
      
      if (optionsNodes[highlightedIndex]) {
        const option = optionsNodes[highlightedIndex] as HTMLElement;
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const containerBottom = containerTop + containerHeight;
        
        const optionTop = option.offsetTop;
        const optionHeight = option.offsetHeight;
        const optionBottom = optionTop + optionHeight;

        if (optionTop < containerTop) {
          container.scrollTop = optionTop;
        } else if (optionBottom > containerBottom) {
          container.scrollTop = optionBottom - containerHeight;
        }
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleOpen = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // Check if space below is less than approximate max height (240px) + padding
      if (spaceBelow < 260) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
    setIsOpen(true);
  };

  const toggleOpen = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
    } else {
      handleOpen();
    }
  };

  const handleSelect = (optionValue: string | number) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValue);
      setSearchQuery('');
      if (searchable && inputRef.current) inputRef.current.focus();
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const removeValue = (e: React.MouseEvent, valToRemove: string | number) => {
    e.stopPropagation();
    if (Array.isArray(value)) {
      onChange(value.filter(v => v !== valToRemove));
    }
  };

  const isSelected = (optValue: string | number) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optValue);
    }
    return value === optValue;
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (!value || (value as any[]).length === 0) return null;
      return (
        <div className="flex flex-wrap gap-1.5 max-w-full">
          {(value as (string | number)[]).map(val => {
            const opt = options.find(o => o.value === val);
            return (
              <span 
                key={val} 
                className={`
                  inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium bg-brand/10 text-brand border border-brand/20
                `}
              >
                {opt?.label || val}
                <button 
                  onClick={(e) => removeValue(e, val)}
                  className="hover:bg-brand/20 rounded-sm p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      );
    } else {
      const opt = options.find(o => o.value === value);
      return opt ? <span className="truncate text-text">{opt.label}</span> : null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div 
      className={`relative flex flex-col gap-1 ${className}`} 
      ref={containerRef}
      style={{ minWidth: minWidth }}
    >
      {label && (
        <label 
          className={`text-muted font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ml-1 cursor-pointer`}
          onClick={() => !disabled && handleOpen()}
        >
          {label}
        </label>
      )}

      {/* Trigger Area */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center justify-between gap-2
          ${styles.height} ${styles.padding} ${styles.rounded}
          bg-surface border border-ui cursor-pointer
          transition-all duration-200 outline-none
          ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-alt/30' : ''}
          ${isOpen ? 'border-brand ring-2 ring-brand/10' : 'border-border hover:border-brand/50'}
          ${error ? 'border-error text-error' : ''}
        `}
      >
        <div className="flex-1 min-w-0 flex items-center">
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent outline-none ${styles.text} placeholder:text-muted/50`}
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            getDisplayValue() || <span className={`text-muted/50 ${styles.text}`}>{placeholder}</span>
          )}
        </div>
        
        <ChevronDown 
          size={styles.iconSize} 
          className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === 'down' ? 8 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === 'down' ? 8 : -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ originY: direction === 'down' ? 0 : 1 }}
            className={`
              absolute ${direction === 'down' ? 'top-full mt-1' : 'bottom-full mb-1'} left-0 right-0 z-50
              bg-surface border border-border border-ui ${styles.rounded} shadow-xl
              flex flex-col
            `}
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <div className={`text-muted text-center italic py-3 ${styles.text}`}>
                No options found
              </div>
            ) : (
              <ScrollPanel ref={scrollRef} height="auto" className="w-full max-h-60">
                {filteredOptions.map((option, index) => {
                  const selected = isSelected(option.value);
                  const isHighlighted = index === highlightedIndex;
                  
                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                         if (!option.disabled) handleSelect(option.value);
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`
                        relative flex items-center justify-between
                        ${styles.optionPad} ${styles.text} cursor-pointer
                        transition-colors duration-150
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${isHighlighted ? 'bg-surface-alt' : ''}
                        ${selected && !multiple ? 'text-brand font-medium bg-brand/5' : 'text-text'}
                      `}
                    >
                      <span className="truncate">{option.label}</span>
                      {selected && (
                        <Check size={styles.iconSize} className="text-brand ml-2 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </ScrollPanel>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation/Helper Text */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted text-xs pl-1"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};