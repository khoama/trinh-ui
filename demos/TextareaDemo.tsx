import React, { useState } from 'react';
import { Textarea } from '../components/ui/Textarea';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

export const TextareaDemo = () => {
  const [basicVal, setBasicVal] = useState('');
  const [autoVal, setAutoVal] = useState('');
  const [labelVal, setLabelVal] = useState('');
  const [errorVal, setErrorVal] = useState('');
  
  const [sizeSm, setSizeSm] = useState('');
  const [sizeMd, setSizeMd] = useState('');
  const [sizeLg, setSizeLg] = useState('');

  const propsData = [
    { name: 'label', type: 'string', description: 'The text for the floating label.' },
    { name: 'value', type: 'string | number', description: 'The current value.' },
    { name: 'onChange', type: 'ChangeEventHandler', description: 'Callback when the value changes.' },
    { name: 'autoResize', type: 'boolean', defaultValue: 'false', description: 'If true, the textarea height adjusts to fit the content.' },
    { name: 'rows', type: 'number', defaultValue: '3', description: 'Initial number of rows.' },
    { name: 'error', type: 'string', description: 'Error message to display below the input.' },
    { name: 'helperText', type: 'string', description: 'Assistive text to display below the input.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'The size of the component.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Textarea</h1>
        <p className="text-muted text-lg">
          A multiline text input with support for auto-resizing, floating labels, and validation.
        </p>
      </div>

      <Story
        title="Basic"
        description="Standard textarea with fixed row count."
        code={`
<Textarea
  placeholder="Type your message here..."
  rows={4}
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-md w-full mx-auto">
          <Textarea
            placeholder="Type your message here..."
            rows={4}
            value={basicVal}
            onChange={(e) => setBasicVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Auto Resizing"
        description="Automatically adjusts height based on content to prevent scrollbars."
        code={`
<Textarea
  label="Auto-growing Note"
  autoResize
  rows={2}
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-md w-full mx-auto">
          <Textarea
            label="Auto-growing Note"
            autoResize
            rows={2}
            value={autoVal}
            onChange={(e) => setAutoVal(e.target.value)}
            helperText="Start typing to see it grow..."
          />
        </div>
      </Story>

      <Story
        title="Floating Label"
        description="Accessible floating label that respects multiline content."
        code={`
<Textarea
  label="Description"
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-md w-full mx-auto">
          <Textarea
            label="Description"
            value={labelVal}
            onChange={(e) => setLabelVal(e.target.value)}
          />
        </div>
      </Story>

      <Story
        title="Sizes"
        description="Available in small, medium, and large variants."
        code={`
<Textarea size="sm" label="Small" ... />
<Textarea size="md" label="Medium" ... />
<Textarea size="lg" label="Large" ... />
        `}
      >
        <div className="max-w-md w-full mx-auto flex flex-col gap-6">
          <Textarea 
            size="sm" 
            label="Small Textarea" 
            rows={2}
            value={sizeSm} 
            onChange={(e) => setSizeSm(e.target.value)} 
          />
          <Textarea 
            size="md" 
            label="Medium Textarea" 
            rows={2}
            value={sizeMd} 
            onChange={(e) => setSizeMd(e.target.value)} 
          />
          <Textarea 
            size="lg" 
            label="Large Textarea" 
            rows={2}
            value={sizeLg} 
            onChange={(e) => setSizeLg(e.target.value)} 
          />
        </div>
      </Story>

      <Story
        title="Validation"
        description="Error states with message."
        code={`
<Textarea
  label="Feedback"
  error="Message is too short"
  value={value}
  onChange={handleChange}
/>
        `}
      >
        <div className="max-w-md w-full mx-auto">
          <Textarea
            label="Feedback"
            error="Message is too short"
            value={errorVal}
            onChange={(e) => setErrorVal(e.target.value)}
          />
        </div>
      </Story>
      
      <PropsTable data={propsData} />
    </div>
  );
};