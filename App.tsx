import React, { useState } from 'react';
import { DocsLayout } from './components/layout/DocsLayout';

// Pages
import { Welcome } from './demos/Welcome';
import { InputDemo } from './demos/InputDemo';
import { SliderDemo } from './demos/SliderDemo';
import { NumberInputDemo } from './demos/NumberInputDemo';
import { DatePickerDemo } from './demos/DatePickerDemo';
import { ColorPickerDemo } from './demos/ColorPickerDemo';
import { TextareaDemo } from './demos/TextareaDemo';
import { SwitchDemo } from './demos/SwitchDemo';
import { TableDemo } from './demos/TableDemo';
import { DropdownDemo } from './demos/DropdownDemo';
import { ScrollPanelDemo } from './demos/ScrollPanelDemo';

const App = () => {
  const [activePage, setActivePage] = useState('welcome');

  const renderPage = () => {
    switch (activePage) {
      case 'input': return <InputDemo />;
      case 'textarea': return <TextareaDemo />;
      case 'slider': return <SliderDemo />;
      case 'switch': return <SwitchDemo />;
      case 'number': return <NumberInputDemo />;
      case 'datepicker': return <DatePickerDemo />;
      case 'colorpicker': return <ColorPickerDemo />;
      case 'table': return <TableDemo />;
      case 'dropdown': return <DropdownDemo />;
      case 'scrollpanel': return <ScrollPanelDemo />;
      case 'welcome': 
      default: 
        return <Welcome onNavigate={setActivePage} />;
    }
  };

  return (
    <DocsLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </DocsLayout>
  );
};

export default App;