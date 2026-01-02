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
      <div className="sm:hidden space-y-2">
        {rows.map((row, rIdx) => {
          const [label, ...values] = row;
          return (
            <div key={rIdx} className="bg-white rounded-lg border border-idus-black-10 overflow-hidden">
              <div className="px-3 py-2 bg-idus-orange text-white font-semibold text-xs leading-snug break-words">
                <span className="opacity-90 text-[10px] font-medium">{labelCol}</span>
                <span className="mx-1 opacity-70">·</span>
                <span className="break-words">{label}</span>
              </div>
              <div className="px-2.5 py-2 grid grid-cols-2 gap-1.5">
                {valueCols.map((col, idx) => (
                  <div
                    key={col}
                    className="bg-idus-gray rounded-md px-2 py-1.5"
                  >
                    <div className="text-[9px] text-idus-black-50 whitespace-nowrap">{col}</div>
                    <div className="text-xs font-semibold text-idus-black mt-0.5 whitespace-nowrap">
                      {values[idx] ?? '-'}
                    </div>
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


