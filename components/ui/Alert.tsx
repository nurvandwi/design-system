import React from 'react';

export type AlertType = 'info' | 'success' | 'error' | 'warning';

export interface AlertProps {
  type?: AlertType;
  title: string;
  description?: string;
  showClose?: boolean;
  onClose?: () => void;
}

const typeConfig: Record<AlertType, {
  bg: string;
  border: string;
  accentBg: string;
  iconColor: string;
  titleColor: string;
  closeColor: string;
}> = {
  info:    { bg: 'bg-[var(--bg-info)]',    border: 'border-[var(--border-info)]',    accentBg: 'bg-[var(--icon-info)]',    iconColor: 'text-[var(--icon-info)]',    titleColor: 'text-[var(--text-info)]',    closeColor: 'text-[var(--icon-info)]'    },
  success: { bg: 'bg-[var(--bg-success)]', border: 'border-[var(--border-success)]', accentBg: 'bg-[var(--icon-success)]', iconColor: 'text-[var(--icon-success)]', titleColor: 'text-[var(--text-success)]', closeColor: 'text-[var(--icon-success)]' },
  error:   { bg: 'bg-[var(--bg-error)]',   border: 'border-[var(--border-error)]',   accentBg: 'bg-[var(--icon-error)]',   iconColor: 'text-[var(--icon-error)]',   titleColor: 'text-[var(--text-error)]',   closeColor: 'text-[var(--icon-error)]'   },
  warning: { bg: 'bg-[var(--bg-warning)]', border: 'border-[var(--border-warning)]', accentBg: 'bg-[var(--icon-warning)]', iconColor: 'text-[var(--icon-warning)]', titleColor: 'text-[var(--text-warning)]', closeColor: 'text-[var(--icon-warning)]' },
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const icons: Record<AlertType, React.ReactNode> = {
  info:    <InfoIcon />,
  success: <SuccessIcon />,
  error:   <ErrorIcon />,
  warning: <WarningIcon />,
};

export function Alert({ type = 'info', title, description, showClose = false, onClose }: AlertProps) {
  const cfg = typeConfig[type];

  return (
    <div
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
      className={[
        'flex flex-row items-center gap-3 rounded-lg p-4 border',
        cfg.bg, cfg.border,
      ].join(' ')}
    >
      {/* Accent bar — 4×24px, radius 2px */}
      <div className={['w-1 h-6 rounded-sm shrink-0', cfg.accentBg].join(' ')} aria-hidden="true" />

      {/* Alert icon — 20×20px */}
      <span className={['shrink-0', cfg.iconColor].join(' ')}>{icons[type]}</span>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <p className={['text-sm font-semibold', cfg.titleColor].join(' ')}>{title}</p>
        {description && (
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{description}</p>
        )}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          className={['shrink-0 opacity-70 hover:opacity-100 transition-opacity', cfg.closeColor].join(' ')}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
