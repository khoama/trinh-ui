import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

export const InputDemo = () => {
  const [defaultVal, setDefaultVal] = useState('');
  const [floatingVal, setFloatingVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [helperVal, setHelperVal] = useState('johndoe');
  
  // Independent states for sizes
  const [sizeSm, setSizeSm] = useState('');
  const [sizeMd, setSizeMd] = useState('');
  const [sizeLg, setSizeLg] = useState('');

  const propsData = [
    { name: 'label', type: 'string', description: 'The text for the floating label.' },
    { name: 'placeholder', type: 'string', description: 'Standard input placeholder text.' },
    { name: 'value', type: 'string | number', description: 'The current value of the input.' },
    { name: 'onChange', type: 'ChangeEventHandler', description: 'Callback when the value changes.' },
    { name: 'type', type: 'string', defaultValue: '"text"', description: 'HTML input type (e.g., text, password, email).' },
    { name: 'error', type: 'string', description: 'Error message to display below the input.' },
    { name: 'helperText', type: 'string', description: 'Assistive text to display below the input.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'The size of the component.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Input</h1>
        <p className="text-muted text-lg">
          A flexible text field that supports standard placeholders, floating labels, and password masking.
        </p>
      </div>

      <Story
        title="Default"
        description="Standard input with a placeholder."
        code={`
const [value, setValue] = useState('');

<Input
  placeholder="Type something..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            placeholder="Type something..."
            value={defaultVal}
            onChange={(e) => setDefaultVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Floating Label"
        description="An accessible floating label that moves on focus."
        code={`
const [value, setValue] = useState('');

<Input
  label="Full Name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            label="Full Name"
            value={floatingVal}
            onChange={(e) => setFloatingVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Password"
        description="Includes a toggle to show/hide the password text."
        code={`
<Input
  type="password"
  label="Password"
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            type="password"
            label="Password"
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Available in small, medium (default), and large sizes."
        code={`
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
        `}
      >
        <div className="max-w-sm w-full mx-auto flex flex-col gap-4">
          <Input 
            size="sm" 
            placeholder="Small Input" 
            value={sizeSm} 
            onChange={(e) => setSizeSm(e.target.value)} 
          />
          <Input 
            size="md" 
            placeholder="Medium Input" 
            value={sizeMd} 
            onChange={(e) => setSizeMd(e.target.value)} 
          />
          <Input 
            size="lg" 
            placeholder="Large Input" 
            value={sizeLg} 
            onChange={(e) => setSizeLg(e.target.value)} 
          />
        </div>
      </Story>

      <Story
        title="With Validation"
        description="Displays error messages with a smooth height transition."
        code={`
<Input
  placeholder="Email Address"
  value={value}
  onChange={handleChange}
  error="Please enter a valid email address"
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            placeholder="Email Address"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            error="Please enter a valid email address"
          />
        </div>
      </Story>

      <Story
        title="Helper Text"
        description="Additional context for the user."
        code={`
<Input
  label="Username"
  helperText="Must be unique and at least 3 chars."
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            label="Username"
            helperText="Must be unique and at least 3 chars."
            value={helperVal}
            onChange={(e) => setHelperVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Disabled"
        description="Indicates non-editable content."
        code={`
<Input
  placeholder="License Key"
  value="XXXX-XXXX-XXXX"
  disabled
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Input
            placeholder="License Key"
            value="XXXX-XXXX-XXXX"
            onChange={() => {}}
            disabled
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};