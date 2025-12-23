import React from 'react';

type ResponsiveTableProps = {
  columns: string[];
  rows: string[][];
  className?: string;
};

export default function ResponsiveTable({ columns, rows, className = '' }: ResponsiveTableProps) {
  const [labelCol, ...valueCols] = columns;

  return (
    <div className={className}>
      {/* Mobile: row cards */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, rIdx) => {
          const [label, ...values] = row;
          return (
            <div key={rIdx} className="bg-white rounded-xl border border-idus-black-10 overflow-hidden">
              <div className="px-4 py-3 bg-idus-orange text-white font-semibold text-sm">
                {labelCol}: {label}
              </div>
              <div className="px-4 py-3 grid grid-cols-2 gap-2">
                {valueCols.map((col, idx) => (
                  <div key={col} className="flex items-center justify-between gap-3 bg-idus-gray rounded-lg px-3 py-2">
                    <div className="text-xs text-idus-black-50">{col}</div>
                    <div className="text-xs font-semibold text-idus-black">{values[idx] ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[520px]">
          <thead>
            <tr className="bg-idus-orange text-white">
              {columns.map((col, idx) => (
                <th key={idx} className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-idus-gray'}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-3 py-2 border-t border-idus-black-10 ${cIdx === 0 ? '' : 'whitespace-nowrap'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


