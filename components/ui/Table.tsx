import React, { forwardRef } from 'react';

const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className = '', ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-ui-lg border border-border border-ui bg-surface">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm text-left ${className}`}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => (
    <thead 
      ref={ref} 
      className={`bg-brand [&_tr]:hover:bg-transparent [&_tr]:border-b-0 ${className}`} 
      {...props} 
    />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = '', ...props }, ref) => (
    <tfoot
      ref={ref}
      className={`border-t border-border bg-surface-alt/50 font-medium [&>tr]:last:border-b-0 ${className}`}
      {...props}
    />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={`
        border-b border-border transition-colors hover:bg-surface-alt/60
        data-[state=selected]:bg-surface-alt group ${className}
      `}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sticky?: 'left' | 'right';
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = '', sticky, ...props }, ref) => (
    <th
      ref={ref}
      className={`
        p-4 text-left align-middle font-bold text-surface [&:has([role=checkbox])]:pr-0
        ${sticky === 'left' ? 'sticky left-0 z-20 bg-brand border-r border-surface/10' : ''}
        ${sticky === 'right' ? 'sticky right-0 z-20 bg-brand border-l border-surface/10' : ''}
        ${className}
      `}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  sticky?: 'left' | 'right';
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = '', sticky, ...props }, ref) => (
    <td
      ref={ref}
      className={`
        p-4 align-middle [&:has([role=checkbox])]:pr-0 text-text
        ${sticky === 'left' ? 'sticky left-0 z-10 bg-surface group-hover:bg-surface-alt/60 border-r border-border' : ''}
        ${sticky === 'right' ? 'sticky right-0 z-10 bg-surface group-hover:bg-surface-alt/60 border-l border-border' : ''}
        ${className}
      `}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className = '', ...props }, ref) => (
    <caption
      ref={ref}
      className={`mt-4 text-sm text-muted ${className}`}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};