import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';

interface PropDef {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export const PropsTable = ({ data }: { data: PropDef[] }) => {
  return (
    <div className="mt-12 space-y-4">
      <h2 className="text-2xl font-bold text-text">API Reference</h2>
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((prop, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono font-bold text-brand">{prop.name}</TableCell>
              <TableCell><code className="px-1.5 py-0.5 rounded bg-surface-alt/50 text-muted text-xs font-mono border border-border">{prop.type}</code></TableCell>
              <TableCell className="font-mono text-sm text-text">{prop.defaultValue || '—'}</TableCell>
              <TableCell className="text-muted">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};