import React, { useState } from 'react';
import { DatePicker } from '../components/ui/DatePicker';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';
import { DateRange } from '../types';

export const DatePickerDemo = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [range, setRange] = useState<DateRange | null>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7))
  });
  const [disabledDate, setDisabledDate] = useState<Date | null>(null);
  const [specificDate, setSpecificDate] = useState<Date | null>(null);
  const [inlineDate, setInlineDate] = useState<Date | null>(new Date());
  const [compactDate, setCompactDate] = useState<Date | null>(new Date());

  // Helper to disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const today = new Date();
  const specificDisabledDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
  ];

  const propsData = [
    { name: 'value', type: 'Date | DateRange | null', description: 'The currently selected date(s).' },
    { name: 'onChange', type: '(date: any) => void', description: 'Callback when date changes.' },
    { name: 'mode', type: '"single" | "range"', defaultValue: '"single"', description: 'Selection mode.' },
    { name: 'variant', type: '"default" | "compact" | "inline"', defaultValue: '"default"', description: 'Visual presentation style.' },
    { name: 'label', type: 'string', description: 'Label text.' },
    { name: 'disabledDates', type: 'Date[] | ((date: Date) => boolean)', description: 'Dates to disable.' },
    { name: 'minDate', type: 'Date', description: 'Minimum selectable date.' },
    { name: 'maxDate', type: 'Date', description: 'Maximum selectable date.' },
    { name: 'placeholder', type: 'string', description: 'Input placeholder text.' },
    { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Size of the trigger input.' },
    { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Date Picker</h1>
        <p className="text-muted text-lg">
          A calendar component supporting single date and range selection, now with Inline and Compact modes.
        </p>
      </div>

      <Story
        title="Single Date"
        description="Pick a specific day using the standard popover input."
        code={`
<DatePicker
  label="Appointment Date"
  mode="single"
  value={date}
  onChange={setDate}
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[350px]">
          <DatePicker
            label="Appointment Date"
            mode="single"
            value={date}
            onChange={setDate}
          />
        </div>
      </Story>

      <Story
        title="Inline Mode"
        description="Display the calendar directly in the layout without a popover."
        code={`
<div className="max-w-xs border rounded-2xl">
  <DatePicker
    variant="inline"
    mode="single"
    value={value}
    onChange={setValue}
  />
</div>
        `}
      >
        <div className="max-w-sm mx-auto">
          <DatePicker
            variant="inline"
            mode="single"
            value={inlineDate}
            onChange={setInlineDate}
          />
        </div>
      </Story>

      <Story
        title="Compact Mode"
        description="A minimal icon-only trigger button."
        code={`
<div className="flex items-center gap-4">
  <span>Due Date: {date?.toLocaleDateString()}</span>
  <DatePicker
    variant="compact"
    value={date}
    onChange={setDate}
  />
</div>
        `}
      >
        <div className="flex items-center justify-center gap-4 min-h-[350px]">
           <div className="p-4 bg-surface-alt rounded-xl border border-border">
              <div className="text-sm text-muted mb-1">Selected Date</div>
              <div className="font-bold text-lg">{compactDate?.toLocaleDateString() || 'None'}</div>
           </div>
           <DatePicker
             variant="compact"
             value={compactDate}
             onChange={setCompactDate}
           />
        </div>
      </Story>

      <Story
        title="Disabled Days (Pattern)"
        description="Disable dates using a function, such as weekends."
        code={`
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

<DatePicker disabledDates={isWeekend} ... />
        `}
      >
        <div className="max-w-xs mx-auto min-h-[350px]">
          <DatePicker
            label="Business Days Only"
            value={disabledDate}
            onChange={setDisabledDate}
            disabledDates={isWeekend}
            placeholder="Select a weekday"
          />
        </div>
      </Story>

      <Story
        title="Specific Disabled Dates"
        description="Disable an array of specific dates."
        code={`
const disabledDays = [
  new Date(2024, 0, 15),
  new Date(2024, 0, 16)
];

<DatePicker disabledDates={disabledDays} ... />
        `}
      >
        <div className="max-w-xs mx-auto min-h-[350px]">
          <DatePicker
            label="Book Appointment"
            value={specificDate}
            onChange={setSpecificDate}
            disabledDates={specificDisabledDates}
            placeholder="Check availability"
          />
        </div>
      </Story>

      <Story
        title="Date Range"
        description="Select a start and end date."
        code={`
<DatePicker
  label="Trip Duration"
  mode="range"
  value={range}
  onChange={setRange}
/>
        `}
      >
        <div className="max-w-xs mx-auto min-h-[350px]">
          <DatePicker
            label="Trip Duration"
            mode="range"
            value={range}
            onChange={setRange}
          />
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};