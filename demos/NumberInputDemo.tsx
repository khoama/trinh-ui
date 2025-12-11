import React, { useState } from 'react';
import { NumberInput } from '../components/ui/NumberInput';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

export const NumberInputDemo = () => {
  const [basicVal, setBasicVal] = useState(1);
  
  // Independent states for sizes
  const [sizeSm, setSizeSm] = useState(1);
  const [sizeMd, setSizeMd] = useState(2);
  const [sizeLg, setSizeLg] = useState(3);

  const [stepVal, setStepVal] = useState(2);

  const propsData = [
    { name: 'value', type: 'number', description: 'The current value.' },
    { name: 'onChange', type: '(value: number) => void', description: 'Callback when value changes.' },
    { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', defaultValue: '1', description: 'Increment/Decrement step.' },
    { name: 'label', type: 'string', description: 'Label text displayed above.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Number Input</h1>
        <p className="text-muted text-lg">
          A stepper control for numeric values with increment/decrement buttons.
        </p>
      </div>

      <Story
        title="Basic Usage"
        description="Simple counter with min/max bounds."
        code={`
import { useState } from 'react';
import { NumberInput } from './components/ui/NumberInput';

const Example = () => {
  const [value, setValue] = useState(1);
  return (
    <NumberInput
      label="Quantity"
      min={0}
      max={10}
      value={value}
      onChange={setValue}
    />
  );
};
        `}
      >
        <div className="flex justify-center">
          <NumberInput
            label="Quantity"
            min={0}
            max={10}
            value={basicVal}
            onChange={setBasicVal}
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Different sizes for various contexts."
        code={`
<NumberInput size="sm" label="Small" value={val1} onChange={setVal1} />
<NumberInput size="md" label="Medium" value={val2} onChange={setVal2} />
<NumberInput size="lg" label="Large" value={val3} onChange={setVal3} />
        `}
      >
        <div className="flex flex-col items-center gap-6">
          <NumberInput 
            size="sm" 
            label="Small" 
            value={sizeSm} 
            onChange={setSizeSm} 
          />
          <NumberInput 
            size="md" 
            label="Medium" 
            value={sizeMd} 
            onChange={setSizeMd} 
          />
          <NumberInput 
            size="lg" 
            label="Large" 
            value={sizeLg} 
            onChange={setSizeLg} 
          />
        </div>
      </Story>

      <Story
        title="Larger Steps"
        description="Increment by 2 or more."
        code={`
<NumberInput
  label="Guests (Pairs)"
  step={2}
  max={20}
  value={value}
  onChange={setValue}
/>
        `}
      >
        <div className="flex justify-center">
          <NumberInput
            label="Guests (Pairs)"
            step={2}
            max={20}
            value={stepVal}
            onChange={setStepVal}
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};