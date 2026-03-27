import React from 'react';

export type TextareaSize = 'large' | 'medium' | 'small';
export type TextareaState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled';

export interface TextareaProps {
  size?: TextareaSize;
  state?: TextareaState;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  maxLength?: number;
  rows?: number;
  onChange?: (value: string) => void;
}

const sizeMap: Record<TextareaSize, { px: string; py: string; text: string }> = {
  large:  { px: 'px-4', py: 'py-3',   text: 'text-base' },
  medium: { px: 'px-3', py: 'py-2',   text: 'text-sm'  },
  small:  { px: 'px-3', py: 'py-1.5', text: 'text-xs'  },
};

export function Textarea({
  size = 'medium',
  state = 'default',
  label,
  placeholder = 'Placeholder',
  helperText,
  value = '',
  maxLength,
  rows = 4,
  onChange,
}: TextareaProps) {
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const { px, py, text } = sizeMap[size];

  const borderClass = isError
    ? 'border-[var(--border-error)]'
    : 'border-[var(--border-default)] focus:border-[var(--button-primary)]';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[var(--text-bold)]">{label}</label>
      )}
      <textarea
        rows={rows}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={isError}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          'w-full rounded border transition-colors outline-none resize-vertical',
          'text-[var(--text-bold)] placeholder:text-[var(--text-placeholder)]',
          'focus:ring-2 focus:ring-[var(--button-primary)] focus:ring-offset-0',
          px, py, text, borderClass,
          isDisabled ? 'bg-[var(--bg-disabled)] cursor-not-allowed text-[var(--text-disabled)]' : 'bg-[var(--bg-surface)]',
        ].join(' ')}
      />
      <div className="flex justify-between">
        {helperText && (
          <p className={['text-xs', isError ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'].join(' ')}>
            {helperText}
          </p>
        )}
        {maxLength && (
          <p className="text-xs text-[var(--text-tertiary)] ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
