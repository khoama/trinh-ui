import React from 'react';
import { Dropdown } from './Dropdown';
import { AutocompleteProps } from '../../types';

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Search...",
  ...props
}) => {
  return (
    <Dropdown
      {...props}
      options={options}
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      searchable={true}
      multiple={false}
    />
  );
};