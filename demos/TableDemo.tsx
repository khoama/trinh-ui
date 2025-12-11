import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';
import { Story } from '../components/layout/Story';
import { PropsTable } from '../components/layout/PropsTable';
import { BadgeCheck, Clock, XCircle } from 'lucide-react';

const INVOICES = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
  },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  {
    invoice: "INV005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
  },
  {
    invoice: "INV006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$200.00",
  },
  {
    invoice: "INV007",
    status: "Unpaid",
    method: "Credit Card",
    amount: "$300.00",
  },
];

export const TableDemo = () => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Paid': return <BadgeCheck size={16} className="text-brand" />;
      case 'Pending': return <Clock size={16} className="text-yellow-500" />;
      case 'Unpaid': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const propsData = [
    { name: 'sticky', type: '"left" | "right"', description: 'Applies to TableHead or TableCell to pin the column.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-border pb-6 mb-10">
        <h1 className="text-3xl font-bold mb-2">Table</h1>
        <p className="text-muted text-lg">
          A responsive data table with hover states and semantic markup.
        </p>
      </div>

      <Story
        title="Standard Table"
        description="Displays a list of recent invoices."
        code={`
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$2,250.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
        `}
      >
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium text-text">{invoice.invoice}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invoice.status)}
                    <span>{invoice.status}</span>
                  </div>
                </TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right text-text font-mono">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-text font-bold">Total</TableCell>
              <TableCell className="text-right text-text font-bold font-mono">$2,250.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Story>

      <Story
        title="Sticky Columns"
        description="Use the 'sticky' prop to pin columns (left or right) during scrolling."
        code={`
<Table>
  <TableHeader>
    <TableRow>
      <TableHead sticky="left">Invoice</TableHead>
      <TableHead>Date</TableHead>
      {/* ... more columns ... */}
      <TableHead sticky="right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map(inv => (
      <TableRow key={inv.id}>
        <TableCell sticky="left">{inv.id}</TableCell>
        <TableCell>{inv.date}</TableCell>
        {/* ... */}
        <TableCell sticky="right">{inv.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        `}
      >
        <div className="overflow-hidden rounded-ui-lg border border-border border-ui">
          <Table>
            {/* Forced width to demonstrate scrolling */}
            <TableHeader className="min-w-[1000px]">
              <TableRow>
                <TableHead sticky="left" className="min-w-[120px]">Invoice (Sticky)</TableHead>
                <TableHead className="min-w-[150px]">Status</TableHead>
                <TableHead className="min-w-[200px]">Customer Email</TableHead>
                <TableHead className="min-w-[200px]">Transaction ID</TableHead>
                <TableHead className="min-w-[150px]">Date Processed</TableHead>
                <TableHead className="min-w-[150px]">Payment Method</TableHead>
                <TableHead sticky="right" className="min-w-[120px] text-right">Amount (Sticky)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="min-w-[1000px]">
              {INVOICES.map((invoice, i) => (
                <TableRow key={invoice.invoice + i}>
                  <TableCell sticky="left" className="font-medium text-text font-mono">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <span>{invoice.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted">customer.name@example.com</TableCell>
                  <TableCell className="font-mono text-xs text-muted">tx_{Math.random().toString(36).substr(2, 9)}</TableCell>
                  <TableCell>Oct {10 + i}, 2024</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell sticky="right" className="text-right text-text font-bold font-mono">
                    {invoice.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Story>

      <PropsTable data={propsData} />
    </div>
  );
};