import React, { useState, useRef, useEffect } from 'react';

export type DatePickerColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type DatePickerSize  = 'sm' | 'md' | 'lg';
export type DatePickerMode  = 'single' | 'range';

export interface DatePickerProps {
  color?:         DatePickerColor;
  size?:          DatePickerSize;
  mode?:          DatePickerMode;
  value?:         string;
  rangeStart?:    string;
  rangeEnd?:      string;
  label?:         string;
  placeholder?:   string;
  disabled?:      boolean;
  error?:         boolean;
  helperText?:    string;
  onChange?:      (value: string) => void;
  onRangeChange?: (start: string, end: string) => void;
}

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const colorAccent: Record<DatePickerColor, { bg: string; color: string; rangeBg: string }> = {
  default:   { bg: '#374151', color: '#fff', rangeBg: '#F3F4F6' },
  primary:   { bg: '#4F46E5', color: '#fff', rangeBg: '#EEF2FF' },
  secondary: { bg: '#7C3AED', color: '#fff', rangeBg: '#F5F3FF' },
  success:   { bg: '#16A34A', color: '#fff', rangeBg: '#F0FDF4' },
  warning:   { bg: '#D97706', color: '#fff', rangeBg: '#FFFBEB' },
  danger:    { bg: '#DC2626', color: '#fff', rangeBg: '#FEF2F2' },
};

// inline styles — avoids Tailwind dynamic class detection issues
const sizeMap: Record<DatePickerSize, { height: number; px: number; fontSize: number }> = {
  sm: { height: 53, px: 12, fontSize: 14 },
  md: { height: 61, px: 16, fontSize: 14 },
  lg: { height: 69, px: 16, fontSize: 16 },
};

function fmt(d: Date) { return d.toISOString().slice(0, 10); }
function displayFmt(str: string) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const ChevLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>;
const ChevRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>;

export function DatePicker({
  color       = 'primary',
  size        = 'md',
  mode        = 'single',
  value,
  rangeStart,
  rangeEnd,
  label,
  placeholder = 'Select date',
  disabled    = false,
  error       = false,
  helperText,
  onChange,
  onRangeChange,
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen]               = useState(false);
  const [viewYear, setViewYear]       = useState(today.getFullYear());
  const [viewMonth, setViewMonth]     = useState(today.getMonth());
  const [hovered, setHovered]         = useState<string | null>(null);
  const [rsInternal, setRsInternal]   = useState(rangeStart ?? '');
  const [reInternal, setReInternal]   = useState(rangeEnd   ?? '');
  const [pickingEnd, setPickingEnd]   = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const accent = colorAccent[color];
  const sz     = sizeMap[size];

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function getDays() {
    const first = new Date(viewYear, viewMonth, 1).getDay();
    const total = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = Array(first).fill(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  function selectDay(day: number) {
    const ds = fmt(new Date(viewYear, viewMonth, day));
    if (mode === 'single') {
      onChange?.(ds);
      setOpen(false);
    } else if (!rsInternal || (!pickingEnd && !reInternal)) {
      setRsInternal(ds); setReInternal(''); setPickingEnd(true);
    } else {
      const [s, e] = ds < rsInternal ? [ds, rsInternal] : [rsInternal, ds];
      setRsInternal(s); setReInternal(e); setPickingEnd(false);
      onRangeChange?.(s, e); setOpen(false);
    }
  }

  const selectedDate = value ?? '';
  const rStart = rangeStart ?? rsInternal;
  const rEnd   = rangeEnd   ?? reInternal;

  function dayState(day: number) {
    const ds       = fmt(new Date(viewYear, viewMonth, day));
    const todayStr = fmt(today);
    const isToday    = ds === todayStr;
    const isSelected = mode === 'single' && ds === selectedDate;
    const isStart    = mode === 'range'  && ds === rStart;
    const isEnd      = mode === 'range'  && ds === rEnd && rEnd !== rStart;
    const inRange    = mode === 'range'  && rStart && rEnd && ds > rStart && ds < rEnd;
    const hoverRange = mode === 'range'  && rStart && !rEnd && hovered &&
      ((ds > rStart && ds <= hovered) || (ds < rStart && ds >= hovered));
    return { isToday, isSelected, isStart, isEnd, inRange: !!(inRange || hoverRange) };
  }

  const displayValue = mode === 'single'
    ? displayFmt(selectedDate)
    : rStart && rEnd
      ? `${displayFmt(rStart)} – ${displayFmt(rEnd)}`
      : rStart ? `${displayFmt(rStart)} – …` : '';

  const triggerBorder = error
    ? '1px solid var(--border-error)'
    : open
      ? '1px solid var(--button-primary)'
      : '1px solid var(--border-default)';

  const triggerShadow = open && !error ? '0 0 0 3px rgba(79,70,229,0.15)' : 'none';

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-bold)' }}>{label}</label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={displayValue ? `Date, ${displayValue}` : placeholder}
        style={{
          width: '100%',
          height: sz.height,
          paddingLeft: sz.px,
          paddingRight: sz.px,
          fontSize: sz.fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          borderRadius: 8,
          border: triggerBorder,
          boxShadow: triggerShadow,
          background: disabled ? 'var(--bg-disabled)' : 'var(--bg-surface)',
          color: disabled ? 'var(--text-disabled)' : 'var(--text-bold)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          textAlign: 'left',
        }}
      >
        <span style={{ color: displayValue ? 'var(--text-bold)' : 'var(--text-placeholder)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayValue || placeholder}
        </span>
        <span style={{ color: 'var(--text-secondary)', flexShrink: 0, display: 'flex' }}>
          <CalIcon />
        </span>
      </button>

      {helperText && (
        <p style={{ fontSize: 12, color: error ? 'var(--text-error)' : 'var(--text-secondary)', margin: 0 }}>
          {helperText}
        </p>
      )}

      {/* Calendar popover */}
      {open && (
        <div
          role="dialog"
          aria-label={mode === 'range' ? 'Choose date range' : 'Choose date'}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 6,
            zIndex: 50,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 12,
            boxShadow: '0 10px 32px rgba(0,0,0,0.12)',
            padding: 16,
            width: 288,
          }}
        >
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              style={{ padding: 6, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}
            >
              <ChevLeft />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-bold)' }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              style={{ padding: 6, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}
            >
              <ChevRight />
            </button>
          </div>

          {/* Day headers — inline grid to guarantee 7-col layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', padding: '4px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
            {getDays().map((day, idx) => {
              if (day === null) return <div key={idx} />;
              const { isToday, isSelected, isStart, isEnd, inRange } = dayState(day);
              const ds = fmt(new Date(viewYear, viewMonth, day));
              const isHighlighted = isSelected || isStart || isEnd;

              return (
                <button
                  key={idx}
                  onClick={() => selectDay(day)}
                  onMouseEnter={() => setHovered(ds)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={isToday ? `Today, ${MONTHS[viewMonth]} ${day}` : `${MONTHS[viewMonth]} ${day}`}
                  aria-pressed={isHighlighted}
                  style={{
                    position: 'relative',
                    height: 32,
                    width: '100%',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: isHighlighted ? 6 : inRange ? 0 : 6,
                    fontSize: 12,
                    fontWeight: isToday && !isHighlighted ? 700 : 500,
                    background: isHighlighted
                      ? accent.bg
                      : inRange
                        ? accent.rangeBg
                        : 'transparent',
                    color: isHighlighted
                      ? accent.color
                      : isToday
                        ? accent.bg
                        : 'var(--text-bold)',
                    transition: 'background 0.1s',
                  }}
                  onMouseOver={e => {
                    if (!isHighlighted && !inRange) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-disabled)';
                  }}
                  onMouseOut={e => {
                    if (!isHighlighted && !inRange) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  {day}
                  {isToday && !isHighlighted && (
                    <span style={{
                      position: 'absolute',
                      bottom: 3,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: accent.bg,
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
