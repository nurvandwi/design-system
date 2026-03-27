import React from 'react';

export type RadioSize = 'large' | 'medium' | 'small';
export type RadioState = 'default' | 'hover' | 'focus' | 'disabled';

export interface RadioButtonProps {
  size?: RadioSize;
  state?: RadioState;
  selected?: boolean;
  label?: string;
  name?: string;
  value?: string;
  onChange?: () => void;
}

const sizeMap: Record<RadioSize, { outer: string; inner: string; label: string }> = {
  large:  { outer: 'w-5 h-5', inner: 'w-2.5 h-2.5', label: 'text-sm' },
  medium: { outer: 'w-4 h-4', inner: 'w-2 h-2',     label: 'text-sm' },
  small:  { outer: 'w-3.5 h-3.5', inner: 'w-1.5 h-1.5', label: 'text-xs' },
};

export function RadioButton({
  size = 'medium',
  state = 'default',
  selected = false,
  label,
  name,
  value,
  onChange,
}: RadioButtonProps) {
  const isDisabled = state === 'disabled';
  const { outer, inner, label: labelSize } = sizeMap[size];

  const borderClass = selected ? 'border-[var(--button-primary)]' : 'border-[var(--border-default)]';

  return (
    <label className={[
      'inline-flex items-center gap-2 cursor-pointer',
      isDisabled ? 'cursor-not-allowed opacity-50' : '',
    ].join(' ')}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        disabled={isDisabled}
        onChange={onChange}
        className="sr-only"
      />
      <span className={[
        'shrink-0 inline-flex items-center justify-center rounded-full border-2 transition-colors',
        outer, borderClass,
        selected ? 'bg-[var(--bg-surface)]' : 'bg-[var(--bg-surface)]',
        isDisabled ? 'bg-[var(--bg-disabled)]' : '',
      ].join(' ')}>
        {selected && (
          <span className={[
            'rounded-full',
            inner,
            isDisabled ? 'bg-[var(--text-disabled)]' : 'bg-[var(--button-primary)]',
          ].join(' ')} />
        )}
      </span>
      {label && (
        <span className={[
          labelSize,
          isDisabled ? 'text-[var(--text-disabled)]' : 'text-[var(--text-bold)]',
        ].join(' ')}>
          {label}
        </span>
      )}
    </label>
  );
}
