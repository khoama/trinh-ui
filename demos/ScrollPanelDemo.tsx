import React from 'react';
import { ScrollPanel } from '../components/ui/ScrollPanel';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';

const MOCK_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  description: 'This is a description used to demonstrate scrolling content.'
}));

export const ScrollPanelDemo = () => {
  const propsData = [
    { name: 'children', type: 'ReactNode', description: 'Content to be scrolled.' },
    { name: 'height', type: 'string | number', defaultValue: '"100%"', description: 'Height of the scroll container.' },
    { name: 'orientation', type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: 'Direction of scrolling.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Scroll Panel</h1>
        <p className="text-muted text-lg">
          A container with custom, animated scrollbars that fade in on hover. Handles native scroll physics gracefully.
        </p>
      </div>

      <Story
        title="Vertical Scroll"
        description="Standard vertical scrolling list with fixed height."
        code={`
<ScrollPanel height={300} className="border rounded-xl">
  <div className="p-4 space-y-4">
    {items.map(item => (
      <div key={item.id} className="p-4 bg-surface-alt rounded-lg">
        {item.title}
      </div>
    ))}
  </div>
</ScrollPanel>
        `}
      >
        <div className="max-w-sm mx-auto w-full">
          <ScrollPanel height={300} className="border border-border border-ui rounded-ui-lg bg-surface">
            <div className="p-4 space-y-3">
              {MOCK_ITEMS.map((item) => (
                <div key={item.id} className="p-4 bg-surface-alt/50 rounded-ui-md border border-border/50 hover:bg-surface-alt transition-colors">
                  <h4 className="font-bold text-text text-sm">{item.title}</h4>
                  <p className="text-muted text-xs mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </ScrollPanel>
        </div>
      </Story>

      <Story
        title="Horizontal Scroll"
        description="Horizontal scrolling for card lists or tables."
        code={`
<ScrollPanel orientation="horizontal" className="border rounded-xl">
  <div className="flex gap-4 p-4 w-max">
    {items.map(item => (
      <Card key={item.id} />
    ))}
  </div>
</ScrollPanel>
        `}
      >
        <div className="w-full">
          <ScrollPanel orientation="horizontal" className="border border-border border-ui rounded-ui-lg bg-surface">
            <div className="flex gap-4 p-4 w-max">
              {MOCK_ITEMS.slice(0, 10).map((item) => (
                <div key={item.id} className="w-40 h-40 flex-shrink-0 p-4 bg-surface-alt/50 rounded-ui-md border border-border/50 hover:bg-surface-alt transition-colors flex flex-col justify-between">
                   <div className="w-8 h-8 rounded-full bg-brand/10 mb-2" />
                   <div>
                     <h4 className="font-bold text-text text-sm">{item.title}</h4>
                     <p className="text-muted text-xs">Horizontal Card</p>
                   </div>
                </div>
              ))}
            </div>
          </ScrollPanel>
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};