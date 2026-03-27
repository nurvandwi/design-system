import React, { useEffect } from 'react';
import { Button } from './Button';

export type ModalType = 'default' | 'info' | 'confirmation' | 'danger' | 'form' | 'slots';

export interface ModalProps {
  type?: ModalType;
  title: string;
  description?: string;
  children?: React.ReactNode;
  open?: boolean;
  hasClose?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
}

const typeIcon: Record<ModalType, React.ReactNode | null> = {
  default:      null,
  info:         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  confirmation: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  danger:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  form:         null,
  slots:        null,
};

const typeIconColor: Record<ModalType, string> = {
  default:      '',
  info:         'text-[var(--text-info)]',
  confirmation: 'text-[var(--text-success)]',
  danger:       'text-[var(--text-error)]',
  form:         '',
  slots:        '',
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export function Modal({
  type = 'default',
  title,
  description,
  children,
  open = true,
  hasClose = true,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
  onPrimary,
  onSecondary,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const primaryType = type === 'danger' ? 'error' : 'primary';
  const icon = typeIcon[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-md rounded bg-[var(--bg-surface)] shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-6 border-b border-[var(--border-default)]">
          {icon && <span className={['shrink-0 mt-0.5', typeIconColor[type]].join(' ')}>{icon}</span>}
          <h2 id="modal-title" className="flex-1 text-base font-semibold text-[var(--text-bold)]">{title}</h2>
          {hasClose && (
            <button onClick={onClose} aria-label="Close modal" className="shrink-0 text-[var(--text-tertiary)] hover:text-[var(--text-bold)] transition-colors">
              <CloseIcon />
            </button>
          )}
        </div>
        {/* Body */}
        {(description || children) && (
          <div className="px-6 py-4">
            {description && <p className="text-sm text-[var(--text-secondary)]">{description}</p>}
            {children}
          </div>
        )}
        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--border-default)]">
          <Button type="secondary" size="medium" label={secondaryLabel} onClick={onSecondary ?? onClose} />
          <Button type={primaryType} size="medium" label={primaryLabel} onClick={onPrimary} />
        </div>
      </div>
    </div>
  );
}
