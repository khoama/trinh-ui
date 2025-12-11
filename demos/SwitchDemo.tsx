import React, { useState } from 'react';
import { Switch } from '../components/ui/Switch';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';
import { Check, Sun, Moon } from 'lucide-react';

export const SwitchDemo = () => {
  const [basicChecked, setBasicChecked] = useState(false);
  const [labelChecked, setLabelChecked] = useState(true);
  
  const [iconChecked, setIconChecked] = useState(true);
  const [themeChecked, setThemeChecked] = useState(false);

  const [smChecked, setSmChecked] = useState(false);
  const [mdChecked, setMdChecked] = useState(true);
  const [lgChecked, setLgChecked] = useState(false);
  
  const [leftChecked, setLeftChecked] = useState(true);
  const [settingChecked, setSettingChecked] = useState(false);

  const propsData = [
    { name: 'checked', type: 'boolean', description: 'The controlled state of the switch.' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback when state changes.' },
    { name: 'label', type: 'string', description: 'The text label.' },
    { name: 'labelPosition', type: '"left" | "right"', defaultValue: '"right"', description: 'Side where the label appears.' },
    { name: 'checkedIcon', type: 'ReactNode', description: 'Element to render inside the thumb when checked.' },
    { name: 'uncheckedIcon', type: 'ReactNode', description: 'Element to render inside the thumb when unchecked.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'The size of the switch.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Switch</h1>
        <p className="text-muted text-lg">
          A toggle component that behaves like a checkbox but looks like a switch.
        </p>
      </div>

      <Story
        title="Basic Usage"
        description="Standard toggle switch."
        code={`
import { useState } from 'react';
import { Switch } from './components/ui/Switch';

const Example = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
};
        `}
      >
        <div className="flex justify-center py-4">
          <Switch
            checked={basicChecked}
            onCheckedChange={setBasicChecked}
          />
        </div>
      </Story>

      <Story
        title="With Icon"
        description="Pass a custom icon element to the checked state."
        code={`
import { Check } from 'lucide-react';

<Switch
  label="Show Status Icon"
  checked={enabled}
  onCheckedChange={setEnabled}
  checkedIcon={<Check size={10} className="text-brand" strokeWidth={4} />}
/>
        `}
      >
        <div className="flex justify-center py-4">
          <Switch
            label="Show Status Icon"
            checked={iconChecked}
            onCheckedChange={setIconChecked}
            checkedIcon={<Check size={10} className="text-brand" strokeWidth={4} />}
          />
        </div>
      </Story>

      <Story
        title="Custom Icons (Theme Toggle)"
        description="Use different icons for both On and Off states."
        code={`
import { Sun, Moon } from 'lucide-react';

<Switch
  size="lg"
  label="Theme Mode"
  checked={isDark}
  onCheckedChange={setIsDark}
  checkedIcon={<Moon size={12} className="text-brand" strokeWidth={3} />}
  uncheckedIcon={<Sun size={12} className="text-yellow-500" strokeWidth={3} />}
/>
        `}
      >
        <div className="flex justify-center py-4">
          <Switch
            size="lg"
            label={themeChecked ? "Dark Mode" : "Light Mode"}
            checked={themeChecked}
            onCheckedChange={setThemeChecked}
            checkedIcon={<Moon size={12} className="text-brand" strokeWidth={3} />}
            uncheckedIcon={<Sun size={12} className="text-yellow-500" strokeWidth={3} />}
          />
        </div>
      </Story>

      <Story
        title="With Label"
        description="Switch with an associated label text."
        code={`
<Switch
  label="Airplane Mode"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
        `}
      >
        <div className="flex justify-center py-4">
          <Switch
            label="Airplane Mode"
            checked={labelChecked}
            onCheckedChange={setLabelChecked}
          />
        </div>
      </Story>

      <Story
        title="Label Position"
        description="Position the label on the left for common settings layouts."
        code={`
<Switch
  label="Notifications"
  labelPosition="left"
  className="w-full justify-between"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
        `}
      >
        <div className="max-w-sm mx-auto flex flex-col gap-4">
          <Switch
            label="Left Aligned Label"
            labelPosition="left"
            checked={leftChecked}
            onCheckedChange={setLeftChecked}
          />
          
          <div className="border border-border rounded-lg p-3 bg-surface-alt/20">
             <Switch
              label="Push Notifications"
              labelPosition="left"
              className="w-full justify-between"
              checked={settingChecked}
              onCheckedChange={setSettingChecked}
            />
          </div>
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Available in small, medium, and large variants."
        code={`
<Switch size="sm" label="Small" ... />
<Switch size="md" label="Medium" ... />
<Switch size="lg" label="Large" ... />
        `}
      >
        <div className="flex flex-col items-center gap-6">
          <Switch 
            size="sm" 
            label="Small Switch" 
            checked={smChecked} 
            onCheckedChange={setSmChecked} 
          />
          <Switch 
            size="md" 
            label="Medium Switch" 
            checked={mdChecked} 
            onCheckedChange={setMdChecked} 
          />
          <Switch 
            size="lg" 
            label="Large Switch" 
            checked={lgChecked} 
            onCheckedChange={setLgChecked} 
          />
        </div>
      </Story>

      <Story
        title="Disabled"
        description="Non-interactive state."
        code={`
<Switch disabled label="Disabled Off" checked={false} />
<Switch disabled label="Disabled On" checked={true} />
        `}
      >
        <div className="flex flex-col items-center gap-4">
          <Switch 
            disabled 
            label="Disabled Off" 
            checked={false} 
            onCheckedChange={() => {}} 
          />
          <Switch 
            disabled 
            label="Disabled On" 
            checked={true} 
            onCheckedChange={() => {}} 
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};