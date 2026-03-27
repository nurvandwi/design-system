import React from 'react';

export type ButtonIconType = 'primary' | 'secondary' | 'tertiary' | 'success' | 'error';
export type ButtonIconSize = 'large' | 'medium' | 'small';

export interface ButtonIconProps {
  type?: ButtonIconType;
  size?: ButtonIconSize;
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string; // aria-label — required
  onClick?: () => void;
}

const typeStyles: Record<ButtonIconType, string> = {
  primary:   'bg-[var(--button-primary)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)]',
  secondary: 'bg-transparent border-2 border-[var(--button-primary)] text-[var(--button-primary)] hover:bg-[var(--button-primary)] hover:text-[var(--button-text-on-filled)] active:bg-[var(--button-primary-active)] active:text-[var(--button-text-on-filled)]',
  tertiary:  'bg-transparent border border-transparent text-[var(--button-primary)] hover:bg-[var(--button-primary)] hover:text-[var(--button-text-on-filled)] active:bg-[var(--button-primary-active)] active:text-[var(--button-text-on-filled)]',
  success:   'bg-[var(--button-success)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-success-hover)] active:bg-[var(--button-success-active)]',
  error:     'bg-[var(--button-error)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-error-hover)] active:bg-[var(--button-error-active)]',
};

// Large: 48px, Medium: 40px, Small: 32px — matches Button sizes
const sizeStyles: Record<ButtonIconSize, string> = {
  large:  'w-12 h-12',
  medium: 'w-10 h-10',
  small:  'w-8  h-8',
};

const DefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

export function ButtonIcon({ type = 'primary', size = 'medium', disabled = false, icon, label, onClick }: ButtonIconProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      aria-disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)] focus-visible:ring-offset-2',
        sizeStyles[size],
        disabled ? 'bg-[var(--button-disabled)] text-[var(--button-disabled-text)] border-transparent cursor-not-allowed pointer-events-none' : typeStyles[type],
      ].join(' ')}
    >
      {icon ?? <DefaultIcon />}
    </button>
  );
}
