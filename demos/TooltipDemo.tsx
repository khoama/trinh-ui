import React from 'react';
import { Tooltip } from '../components/ui/Tooltip';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';
import { Info, HelpCircle, Bell, Settings } from 'lucide-react';

export const TooltipDemo = () => {
  const propsData = [
    { name: 'content', type: 'ReactNode', description: 'The content to display inside the tooltip.' },
    { name: 'children', type: 'ReactNode', description: 'The trigger element.' },
    { name: 'delay', type: 'number', defaultValue: '200', description: 'Delay in milliseconds before showing.' },
    { name: 'placement', type: '"top" | "bottom" | "left" | "right"', defaultValue: '"top"', description: 'Position relative to the trigger.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Tooltip</h1>
        <p className="text-muted text-lg">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      <Story
        title="Basic Usage"
        description="Default top placement with a short delay."
        code={`
<Tooltip content="Add to library">
  <button className="p-2 rounded-full bg-surface-alt">
    <Plus />
  </button>
</Tooltip>
        `}
      >
        <div className="flex justify-center py-8">
          <Tooltip content="More information">
            <button className="flex items-center gap-2 px-4 py-2 bg-brand text-surface rounded-ui-md font-medium hover:opacity-90 transition-opacity">
              <Info size={18} />
              Hover me
            </button>
          </Tooltip>
        </div>
      </Story>

      <Story
        title="Placements"
        description="Tooltips can be positioned on any side of the trigger element."
        code={`
<Tooltip placement="top" content="Top" />
<Tooltip placement="right" content="Right" />
<Tooltip placement="bottom" content="Bottom" />
<Tooltip placement="left" content="Left" />
        `}
      >
        <div className="flex flex-col items-center gap-8 py-4">
          <div className="flex gap-8">
            <Tooltip placement="top" content="Top Tooltip">
              <button className="w-24 h-10 border border-border rounded-ui-md bg-surface hover:bg-surface-alt">Top</button>
            </Tooltip>
          </div>
          <div className="flex gap-8">
            <Tooltip placement="left" content="Left Tooltip">
              <button className="w-24 h-10 border border-border rounded-ui-md bg-surface hover:bg-surface-alt">Left</button>
            </Tooltip>
            <Tooltip placement="right" content="Right Tooltip">
              <button className="w-24 h-10 border border-border rounded-ui-md bg-surface hover:bg-surface-alt">Right</button>
            </Tooltip>
          </div>
          <div className="flex gap-8">
            <Tooltip placement="bottom" content="Bottom Tooltip">
              <button className="w-24 h-10 border border-border rounded-ui-md bg-surface hover:bg-surface-alt">Bottom</button>
            </Tooltip>
          </div>
        </div>
      </Story>

      <Story
        title="Instant & Delayed"
        description="Customize the delay before the tooltip appears."
        code={`
<Tooltip delay={0} content="Instant!">
  <button>No Delay</button>
</Tooltip>

<Tooltip delay={1000} content="Finally!">
  <button>1s Delay</button>
</Tooltip>
        `}
      >
        <div className="flex justify-center gap-8 py-8">
          <Tooltip delay={0} content="Appears instantly!">
            <div className="p-3 bg-surface-alt rounded-full cursor-help hover:bg-surface-alt/80">
              <Bell size={20} />
            </div>
          </Tooltip>
          
          <Tooltip delay={500} content="Wait for it...">
            <div className="p-3 bg-surface-alt rounded-full cursor-help hover:bg-surface-alt/80">
              <HelpCircle size={20} />
            </div>
          </Tooltip>

          <Tooltip delay={1000} content="Long delay (1000ms)">
            <div className="p-3 bg-surface-alt rounded-full cursor-help hover:bg-surface-alt/80">
              <Settings size={20} />
            </div>
          </Tooltip>
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};