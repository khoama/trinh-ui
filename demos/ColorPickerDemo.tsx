import React, { useState } from 'react';
import { ColorPicker } from '../components/ui/ColorPicker';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

export const ColorPickerDemo = () => {
  const [mainColor, setMainColor] = useState('#3b82f6');
  const [inlineColor, setInlineColor] = useState('#10b981');
  const [compactColor, setCompactColor] = useState('#f43f5e');
  
  // Independent states for sizes
  const [sizeSm, setSizeSm] = useState('#10b981');
  const [sizeMd, setSizeMd] = useState('#f59e0b');
  const [sizeLg, setSizeLg] = useState('#ef4444');

  const propsData = [
    { name: 'value', type: 'string', description: 'Current color in Hex format.' },
    { name: 'onChange', type: '(color: string) => void', description: 'Callback when color changes.' },
    { name: 'variant', type: '"default" | "compact" | "inline"', defaultValue: '"default"', description: 'Visual style.' },
    { name: 'label', type: 'string', description: 'Label text.' },
    { name: 'presets', type: 'string[]', description: 'Array of hex color presets.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Size of the input/trigger.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Color Picker</h1>
        <p className="text-muted text-lg">
          A powerful color selection tool with Saturation/Value area, Hue slider, RGB fine-tuning, and Presets.
        </p>
      </div>

      <Story
        title="Inline Picker"
        description="Display the picker directly on the page for immediate access."
        code={`
<ColorPicker
  variant="inline"
  label="Theme Color"
  value={color}
  onChange={setColor}
/>
        `}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
           <div className="flex-1">
             <ColorPicker
               variant="inline"
               label="Inline Selection"
               value={inlineColor}
               onChange={setInlineColor}
             />
           </div>
           <div 
             className="w-32 h-32 rounded-2xl shadow-lg border border-border transition-colors duration-300"
             style={{ backgroundColor: inlineColor }}
           />
        </div>
      </Story>

      <Story
        title="Full Featured (Default)"
        description="Standard popover with hex input and eye dropper."
        code={`
import { useState } from 'react';
import { ColorPicker } from './components/ui/ColorPicker';

const Example = () => {
  const [color, setColor] = useState('#3b82f6');
  return (
    <ColorPicker
      label="Accent Color"
      value={color}
      onChange={setColor}
    />
  );
};
        `}
      >
        <div className="max-w-sm mx-auto min-h-[400px]">
           <ColorPicker
             label="Brand Color"
             value={mainColor}
             onChange={setMainColor}
           />
           <div 
             className="mt-8 p-4 rounded-lg border border-border flex items-center justify-center gap-4 transition-colors duration-300"
             style={{ backgroundColor: `${mainColor}20` }}
           >
             <div 
               className="w-16 h-16 rounded-full shadow-lg"
               style={{ backgroundColor: mainColor }}
             />
             <span className="font-mono text-lg font-bold" style={{ color: mainColor }}>
               {mainColor}
             </span>
           </div>
        </div>
      </Story>

      <Story
        title="Compact Mode"
        description="Minimal circular trigger for tight spaces."
        code={`
<ColorPicker
  variant="compact"
  label="Icon Color"
  value={color}
  onChange={setColor}
/>
        `}
      >
        <div className="flex items-center justify-center gap-8 min-h-[350px]">
          <ColorPicker
            variant="compact"
            label="Icon Color"
            value={compactColor}
            onChange={setCompactColor}
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Various sizes for the input and swatch."
        code={`
<ColorPicker size="sm" label="Small" value={val1} onChange={setVal1} />
<ColorPicker size="md" label="Medium" value={val2} onChange={setVal2} />
<ColorPicker size="lg" label="Large" value={val3} onChange={setVal3} />
        `}
      >
        <div className="max-w-sm mx-auto flex flex-col gap-6">
          <ColorPicker size="sm" label="Small" value={sizeSm} onChange={setSizeSm} />
          <ColorPicker size="md" label="Medium" value={sizeMd} onChange={setSizeMd} />
          <ColorPicker size="lg" label="Large" value={sizeLg} onChange={setSizeLg} />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};