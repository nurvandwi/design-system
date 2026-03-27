import React from 'react';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'success' | 'error';
export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps {
  /** Visual style — matches Figma: primary | secondary | tertiary | success | error */
  type?: ButtonType;
  /** Button size */
  size?: ButtonSize;
  /** Text label */
  label?: string;
  /** Show loading spinner */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon before label */
  iconLeft?: React.ReactNode;
  /** Icon after label */
  iconRight?: React.ReactNode;
  onClick?: () => void;
}

// Exact from Figma — radius 4px, font-semibold, gap 8px on all types
const typeStyles: Record<ButtonType, string> = {
  // bg: button-primary (#7a3681), text: white
  primary:   'bg-[var(--button-primary)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)]',
  // bg: transparent, 2px border button-primary, text: button-primary
  secondary: 'bg-transparent border-2 border-[var(--button-primary)] text-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] hover:text-[var(--button-text-on-filled)] hover:border-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)] active:text-[var(--button-text-on-filled)] active:border-[var(--button-primary-active)]',
  // bg: transparent, no border, text: button-primary (ghost/text style)
  tertiary:  'bg-transparent border border-transparent text-[var(--button-primary)] hover:bg-[var(--button-primary)] hover:text-[var(--button-text-on-filled)] active:bg-[var(--button-primary-active)] active:text-[var(--button-text-on-filled)]',
  // bg: button-success (#16a34a), text: white
  success:   'bg-[var(--button-success)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-success-hover)] active:bg-[var(--button-success-active)]',
  // bg: button-error (#dc2626), text: white
  error:     'bg-[var(--button-error)] text-[var(--button-text-on-filled)] border border-transparent hover:bg-[var(--button-error-hover)] active:bg-[var(--button-error-active)]',
};

// Exact from Figma
// Large:  h=48px, px=24px, py=12px, text=16px
// Medium: h=40px, px=16px, py=8px,  text=14px
// Small:  h=32px, px=12px, py=6px,  text=12px
const sizeStyles: Record<ButtonSize, string> = {
  large:  'h-12 px-6  py-3   text-base gap-2',
  medium: 'h-10 px-4  py-2   text-sm   gap-2',
  small:  'h-8  px-3  py-1.5 text-xs   gap-2',
};

// Disabled: bg button-disabled (#d4d4d4), text button-disabled-text (#737373)
const disabledStyles = 'bg-[var(--button-disabled)] text-[var(--button-disabled-text)] border-transparent cursor-not-allowed pointer-events-none';

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export function Button({
  type = 'primary',
  size = 'medium',
  label = 'Button',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={[
        // Base — radius 4px (rounded), font-semibold (600), transition
        'inline-flex items-center justify-center font-semibold rounded transition-colors',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)] focus-visible:ring-offset-2',
        sizeStyles[size],
        isDisabled ? disabledStyles : typeStyles[type],
      ].join(' ')}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {iconLeft  && <span className="shrink-0 inline-flex">{iconLeft}</span>}
          <span>{label}</span>
          {iconRight && <span className="shrink-0 inline-flex">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
