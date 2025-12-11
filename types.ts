import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export interface BaseProps {
  className?: string;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: Size;
  autoResize?: boolean;
}

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  disabled?: boolean;
  size?: Size;
}

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
  size?: Size;
  className?: string;
  id?: string;
}

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  size?: Size;
}

export type DateRange = { from: Date | null; to: Date | null };

export interface DatePickerProps {
  value: Date | DateRange | null;
  onChange: (date: any) => void;
  mode?: 'single' | 'range';
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  disabledDates?: Date[] | ((date: Date) => boolean);
  placeholder?: string;
  size?: Size;
  variant?: 'default' | 'compact' | 'inline';
}

export interface ColorPickerProps {
  value: string; // Hex code
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
  size?: Size;
  variant?: 'default' | 'compact' | 'inline';
}

export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DropdownProps {
  options: Option[];
  value: string | number | (string | number)[] | null;
  onChange: (value: any) => void;
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  searchable?: boolean; // If true, acts as Autocomplete
  disabled?: boolean;
  error?: string;
  helperText?: string;
  size?: Size;
  className?: string;
  minWidth?: string | number;
}

export interface AutocompleteProps extends Omit<DropdownProps, 'multiple' | 'searchable'> {
  // Autocomplete specific props if any
  onSearchChange?: (query: string) => void;
}

export interface ScrollPanelProps {
  children: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  height?: string | number;
}

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}