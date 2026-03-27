import React, { useState } from 'react';
import { Badge, type BadgeColor } from './Badge';
import { Checkbox } from './Checkbox';

export type ColumnType = 'default' | 'badge' | 'action' | 'nominal';

export interface Column {
  key: string;
  label: string;
  ariaLabel?: string;
  type?: ColumnType;
  sortable?: boolean;
  width?: string;
}

export interface BadgeCell {
  label: string;
  color?: BadgeColor;
}

export interface TableProps {
  columns: Column[];
  rows: Record<string, string | number | boolean | BadgeCell>[];
  selectable?: boolean;
  caption?: string;
  onAction?: (row: Record<string, string | number | boolean | BadgeCell>) => void;
}

type SortDir = 'asc' | 'desc' | null;

const ChevronUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m18 15-6-6-6 6"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
  </svg>
);

export function Table({ columns, rows, selectable = false, caption, onAction }: TableProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const allSelected = selected.size === rows.length && rows.length > 0;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((_, i) => i)));
  }

  function toggleRow(i: number) {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  }

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = [...rows].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey]; const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  return (
    <div className="w-full overflow-x-auto rounded border border-[var(--border-default)]">
      <table className="w-full border-collapse text-sm" aria-label={caption}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
            {selectable && (
              <th className="w-10 px-3 py-3 text-left" aria-label="Row selection">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                  size="small"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                aria-label={!col.label ? col.ariaLabel : undefined}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                className={[
                  'px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide whitespace-nowrap',
                  col.sortable ? 'cursor-pointer select-none hover:text-[var(--text-bold)]' : '',
                  col.type === 'nominal' ? 'text-right' : '',
                  col.type === 'action' ? 'text-right w-10' : '',
                ].join(' ')}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {!col.label && col.ariaLabel && (
                    <span className="sr-only">{col.ariaLabel}</span>
                  )}
                  {col.sortable && (
                    <span className="inline-flex flex-col text-[var(--text-tertiary)]">
                      {sortKey === col.key && sortDir === 'asc'
                        ? <ChevronUpIcon />
                        : sortKey === col.key && sortDir === 'desc'
                          ? <ChevronDownIcon />
                          : <span className="opacity-30"><ChevronUpIcon /></span>}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const isSelected = selected.has(i);
            return (
              <tr
                key={i}
                className={[
                  'border-b border-[var(--border-default)] last:border-0 transition-colors',
                  isSelected
                    ? 'bg-[#EEF2FF]'
                    : 'bg-[var(--bg-surface)] hover:bg-[#F5F5F5]',
                ].join(' ')}
              >
                {selectable && (
                  <td className="px-3 py-3">
                    <Checkbox checked={isSelected} onChange={() => toggleRow(i)} size="small" aria-label={`Select row ${i + 1}`} />
                  </td>
                )}
                {columns.map(col => {
                  const val = row[col.key];
                  return (
                    <td
                      key={col.key}
                      className={[
                        'px-4 py-3 text-[var(--text-bold)]',
                        col.type === 'nominal' ? 'text-right font-mono tabular-nums' : '',
                        col.type === 'action' ? 'text-right' : '',
                      ].join(' ')}
                    >
                      {col.type === 'badge' && typeof val === 'object' && val !== null ? (
                        <Badge
                          color={(val as BadgeCell).color ?? 'neutral'}
                          label={(val as BadgeCell).label}
                          style="subtle"
                        />
                      ) : col.type === 'action' ? (
                        <button
                          onClick={() => onAction?.(row)}
                          aria-label="Row actions"
                          className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-bold)] hover:bg-[var(--bg-disabled)] transition-colors"
                        >
                          <DotsIcon />
                        </button>
                      ) : col.type === 'nominal' && typeof val === 'number' ? (
                        val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
                      ) : (
                        String(val ?? '—')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
