import React, { useState } from 'react';
import { Slider } from '../components/ui/Slider';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

export const SliderDemo = () => {
  const [continuousVal, setContinuousVal] = useState(50);
  
  // Independent states for sizes
  const [sizeSm, setSizeSm] = useState(30);
  const [sizeMd, setSizeMd] = useState(50);
  const [sizeLg, setSizeLg] = useState(70);

  const [steppedVal, setSteppedVal] = useState(25);

  const propsData = [
    { name: 'value', type: 'number', description: 'The current value of the slider.' },
    { name: 'min', type: 'number', description: 'The minimum value.' },
    { name: 'max', type: 'number', description: 'The maximum value.' },
    { name: 'onChange', type: '(value: number) => void', description: 'Callback when the value changes.' },
    { name: 'step', type: 'number', defaultValue: '1', description: 'The interval between valid values.' },
    { name: 'label', type: 'string', description: 'Label displayed above the track.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'The size of the track and handle.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Slider</h1>
        <p className="text-muted text-lg">
          A range input wrapper with spring-based handle animations and accessible keyboard support.
        </p>
      </div>

      <Story
        title="Continuous"
        description="A standard slider for selecting a value within a range."
        code={`
import { useState } from 'react';
import { Slider } from './components/ui/Slider';

const Example = () => {
  const [value, setValue] = useState(50);
  return (
    <Slider
      label="Volume"
      min={0}
      max={100}
      value={value}
      onChange={setValue}
    />
  );
};
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Slider
            label="Volume"
            min={0}
            max={100}
            value={continuousVal}
            onChange={setContinuousVal}
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Control track thickness and handle size."
        code={`
<Slider size="sm" label="Small" value={val1} onChange={setVal1} />
<Slider size="md" label="Medium" value={val2} onChange={setVal2} />
<Slider size="lg" label="Large" value={val3} onChange={setVal3} />
        `}
      >
        <div className="max-w-sm w-full mx-auto flex flex-col gap-6">
          <Slider 
            size="sm" 
            label="Small" 
            min={0} 
            max={100} 
            value={sizeSm} 
            onChange={setSizeSm} 
          />
          <Slider 
            size="md" 
            label="Medium" 
            min={0} 
            max={100} 
            value={sizeMd} 
            onChange={setSizeMd} 
          />
          <Slider 
            size="lg" 
            label="Large" 
            min={0} 
            max={100} 
            value={sizeLg} 
            onChange={setSizeLg} 
          />
        </div>
      </Story>

      <Story
        title="Stepped"
        description="Snaps to specific increments (e.g., steps of 25)."
        code={`
<Slider
  label="Opacity"
  min={0}
  max={100}
  step={25}
  value={value}
  onChange={setValue}
/>
        `}
      >
        <div className="max-w-sm w-full mx-auto">
          <Slider
            label="Opacity"
            min={0}
            max={100}
            step={25}
            value={steppedVal}
            onChange={setSteppedVal}
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};