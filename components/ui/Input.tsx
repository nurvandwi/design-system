import React, { useId } from 'react';

export type InputSize = 'large' | 'medium' | 'small';
export type InputState = 'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled';
export type InputType = 'default' | 'search' | 'number';

export interface InputProps {
  inputType?: InputType;
  size?: InputSize;
  state?: InputState;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const sizeMap: Record<InputSize, { height: string; px: string; py: string; text: string }> = {
  large:  { height: 'h-12', px: 'px-4', py: 'py-3',   text: 'text-base' },
  medium: { height: 'h-10', px: 'px-3', py: 'py-2',   text: 'text-sm'  },
  small:  { height: 'h-8',  px: 'px-3', py: 'py-1.5', text: 'text-xs'  },
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

export function Input({
  inputType = 'default',
  size = 'medium',
  state = 'default',
  label,
  placeholder = 'Placeholder',
  helperText,
  value,
  onChange,
  leadingIcon,
  trailingIcon,
}: InputProps) {
  const uid = useId();
  const inputId = `input-${uid}`;
  const helperId = `helper-${uid}`;
  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const { height, px, py, text } = sizeMap[size];

  const borderClass = isError
    ? 'border-[var(--border-error)] focus:border-[var(--border-error)]'
    : 'border-[var(--border-default)] focus:border-[var(--button-primary)]';

  const bgClass = isDisabled ? 'bg-[var(--bg-disabled)]' : 'bg-[var(--bg-surface)]';

  const showLeading = inputType === 'search' || !!leadingIcon;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-bold)]">{label}</label>
      )}
      <div className="relative flex items-center">
        {showLeading && (
          <span className="absolute left-3 text-[var(--icon-base)] pointer-events-none">
            {leadingIcon ?? <SearchIcon />}
          </span>
        )}
        <input
          id={inputId}
          type={inputType === 'search' ? 'search' : inputType === 'number' ? 'number' : 'text'}
          value={value}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-invalid={isError}
          aria-describedby={helperText ? helperId : undefined}
          onChange={(e) => onChange?.(e.target.value)}
          className={[
            'w-full rounded border transition-colors outline-none',
            'text-[var(--text-bold)] placeholder:text-[var(--text-placeholder)]',
            'focus:ring-2 focus:ring-[var(--button-primary)] focus:ring-offset-0',
            height, px, py, text, borderClass, bgClass,
            showLeading ? 'pl-9' : '',
            trailingIcon ? 'pr-9' : '',
            isDisabled ? 'cursor-not-allowed text-[var(--text-disabled)]' : '',
          ].join(' ')}
        />
        {trailingIcon && (
          <span className="absolute right-3 text-[var(--icon-base)] pointer-events-none">
            {trailingIcon}
          </span>
        )}
      </div>
      {helperText && (
        <p id={helperId} className={['text-xs', isError ? 'text-[var(--text-error)]' : 'text-[var(--text-secondary)]'].join(' ')}>
          {helperText}
        </p>
      )}
    </div>
  );
}
