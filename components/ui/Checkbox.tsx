import React, { useRef, useEffect } from 'react';

export type CheckboxSize = 'large' | 'medium' | 'small';
export type CheckboxState = 'default' | 'hover' | 'focus' | 'error' | 'disabled';

export interface CheckboxProps {
  size?: CheckboxSize;
  state?: CheckboxState;
  checked?: boolean;
  indeterminate?: boolean;
  label?: string;
  'aria-label'?: string;
  helperText?: string;
  showLabel?: boolean;
  showHelper?: boolean;
  onChange?: (checked: boolean) => void;
}

const sizeMap: Record<CheckboxSize, { box: string; label: string }> = {
  large:  { box: 'w-5 h-5', label: 'text-sm' },
  medium: { box: 'w-4 h-4', label: 'text-sm' },
  small:  { box: 'w-3.5 h-3.5', label: 'text-xs' },
};

export function Checkbox({
  size = 'medium',
  state = 'default',
  checked = false,
  indeterminate = false,
  label,
  'aria-label': ariaLabel,
  helperText,
  showLabel = true,
  showHelper = false,
  onChange,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const { box, label: labelSize } = sizeMap[size];

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const borderClass = isError
    ? 'border-[var(--border-error)]'
    : checked || indeterminate
      ? 'border-[var(--button-primary)]'
      : 'border-[var(--border-default)]';

  const bgClass = checked || indeterminate
    ? isDisabled ? 'bg-[var(--bg-disabled)]' : 'bg-[var(--button-primary)]'
    : isDisabled ? 'bg-[var(--bg-disabled)]' : 'bg-[var(--bg-surface)]';

  return (
    <label className={[
      'inline-flex items-center gap-2 cursor-pointer',
      isDisabled ? 'cursor-not-allowed opacity-50' : '',
    ].join(' ')}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        aria-invalid={isError}
        aria-label={!label ? ariaLabel : undefined}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <span className={[
        'shrink-0 inline-flex items-center justify-center rounded border-2 transition-colors',
        box, borderClass, bgClass,
        !isDisabled && 'focus-within:ring-2 focus-within:ring-[var(--button-primary)] focus-within:ring-offset-1',
      ].join(' ')}>
        {indeterminate && !checked && (
          <svg viewBox="0 0 10 2" fill="white" className="w-2.5 h-0.5"><rect width="10" height="2" rx="1"/></svg>
        )}
        {checked && (
          <svg viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2">
            <path d="M1 4l2.5 2.5L9 1"/>
          </svg>
        )}
      </span>
      {showLabel && label && (
        <div className="flex flex-col gap-0.5">
          <span className={[labelSize, 'text-[var(--text-bold)]', isDisabled ? 'text-[var(--text-disabled)]' : ''].join(' ')}>
            {label}
          </span>
          {showHelper && helperText && (
            <span className={['text-xs', isError ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'].join(' ')}>
              {helperText}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
