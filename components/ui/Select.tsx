import React, { useId } from 'react';

export type SelectSize = 'large' | 'medium' | 'small';
export type SelectState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled';

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  size?: SelectSize;
  state?: SelectState;
  label?: string;
  placeholder?: string;
  helperText?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
}

const sizeMap: Record<SelectSize, { height: string; px: string; text: string }> = {
  large:  { height: 'h-12', px: 'px-4', text: 'text-base' },
  medium: { height: 'h-10', px: 'px-3', text: 'text-sm'  },
  small:  { height: 'h-8',  px: 'px-3', text: 'text-xs'  },
};

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export function Select({
  size = 'medium',
  state = 'default',
  label,
  placeholder = 'Select an option',
  helperText,
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  value,
  onChange,
}: SelectProps) {
  const uid = useId();
  const selectId = `select-${uid}`;
  const helperId = `helper-${uid}`;
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const { height, px, text } = sizeMap[size];

  const borderClass = isError
    ? 'border-[var(--border-error)]'
    : 'border-[var(--border-default)] focus:border-[var(--button-primary)]';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--text-bold)]">{label}</label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value ?? ''}
          disabled={isDisabled}
          aria-invalid={isError}
          aria-describedby={helperText ? helperId : undefined}
          onChange={(e) => onChange?.(e.target.value)}
          className={[
            'w-full appearance-none rounded border transition-colors outline-none',
            'text-[var(--text-bold)]',
            'focus:ring-2 focus:ring-[var(--button-primary)] focus:ring-offset-0',
            height, px, text, borderClass,
            isDisabled ? 'bg-[var(--bg-disabled)] cursor-not-allowed text-[var(--text-disabled)]' : 'bg-[var(--bg-surface)]',
            !value ? 'text-[var(--text-placeholder)]' : '',
            'pr-9',
          ].join(' ')}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--icon-base)]">
          <ChevronDown />
        </span>
      </div>
      {helperText && (
        <p id={helperId} className={['text-xs', isError ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'].join(' ')}>
          {helperText}
        </p>
      )}
    </div>
  );
}
