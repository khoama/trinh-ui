import React, { useState } from 'react';
import { Dropdown } from '../components/ui/Dropdown';
import { Autocomplete } from '../components/ui/Autocomplete';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

const OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Solid', value: 'solid' },
  { label: 'Qwik', value: 'qwik' },
];

const FRAMEWORKS = [
  { label: 'Next.js', value: 'next' },
  { label: 'Remix', value: 'remix' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Astro', value: 'astro' },
  { label: 'Nuxt', value: 'nuxt' },
];

export const DropdownDemo = () => {
  const [singleVal, setSingleVal] = useState<string | null>(null);
  const [multiVal, setMultiVal] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState<string | null>(null);
  const [sizeVal, setSizeVal] = useState<string | null>(null);
  const [errorVal, setErrorVal] = useState<string | null>(null);

  const propsData = [
    { name: 'options', type: 'Option[]', description: 'Array of { label, value } objects.' },
    { name: 'value', type: 'string | number | array', description: 'Current selected value(s).' },
    { name: 'onChange', type: '(val) => void', description: 'Callback when selection changes.' },
    { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Enable multi-selection.' },
    { name: 'searchable', type: 'boolean', defaultValue: 'false', description: 'Enable search filter input.' },
    { name: 'label', type: 'string', description: 'Label text.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
    { name: 'error', type: 'string', description: 'Error message to display below.' },
    { name: 'minWidth', type: 'string | number', defaultValue: '200', description: 'Minimum width of the dropdown container.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Dropdown & Autocomplete</h1>
        <p className="text-muted text-lg">
          Select and Combobox components with support for filtering and multi-selection.
        </p>
      </div>

      <Story
        title="Single Selection"
        description="Standard dropdown for selecting a single item."
        code={`
<Dropdown
  label="Frontend Framework"
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    // ...
  ]}
  value={value}
  onChange={setValue}
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[250px]">
          <Dropdown
            label="Frontend Framework"
            options={OPTIONS}
            value={singleVal}
            onChange={setSingleVal}
          />
        </div>
      </Story>

      <Story
        title="Multiple Selection"
        description="Select multiple items with tag visualization."
        code={`
<Dropdown
  multiple
  label="Tech Stack"
  options={OPTIONS}
  value={multiValues} // ['react', 'vue']
  onChange={setMultiValues}
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[250px]">
          <Dropdown
            multiple
            label="Tech Stack"
            options={OPTIONS}
            value={multiVal}
            onChange={setMultiVal}
            helperText="Select all that apply."
          />
        </div>
      </Story>

      <Story
        title="Autocomplete (Search)"
        description="Searchable dropdown for filtering large lists."
        code={`
<Autocomplete
  label="Framework"
  options={FRAMEWORKS}
  value={searchVal}
  onChange={setSearchVal}
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[250px]">
          <Autocomplete
            label="Framework"
            options={FRAMEWORKS}
            value={searchVal}
            onChange={setSearchVal}
            placeholder="Type to search..."
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Available in sm, md, and lg."
        code={`
<Dropdown size="sm" ... />
<Dropdown size="md" ... />
<Dropdown size="lg" ... />
        `}
      >
        <div className="max-w-xs mx-auto flex flex-col gap-4 min-h-[200px]">
          <Dropdown
            size="sm"
            label="Small"
            options={OPTIONS}
            value={sizeVal}
            onChange={setSizeVal}
          />
          <Dropdown
            size="md"
            label="Medium"
            options={OPTIONS}
            value={sizeVal}
            onChange={setSizeVal}
          />
           <Dropdown
            size="lg"
            label="Large"
            options={OPTIONS}
            value={sizeVal}
            onChange={setSizeVal}
          />
        </div>
      </Story>

      <Story
        title="Validation"
        description="Displays an error message below the dropdown."
        code={`
<Dropdown
  label="Required Field"
  options={OPTIONS}
  value={value}
  onChange={setValue}
  error="Please select an option"
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[250px]">
          <Dropdown
            label="Required Field"
            options={OPTIONS}
            value={errorVal}
            onChange={setErrorVal}
            error={!errorVal ? "Please select an option" : undefined}
          />
        </div>
      </Story>

      <Story
        title="Disabled"
        description="Non-interactive state."
        code={`
<Dropdown disabled label="Disabled" ... />
        `}
      >
        <div className="max-w-xs mx-auto">
          <Dropdown
            disabled
            label="Restricted Selection"
            options={OPTIONS}
            value="react"
            onChange={() => {}}
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};