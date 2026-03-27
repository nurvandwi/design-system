import React from 'react';

export type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'neutral' | 'info';
export type BadgeStyle = 'filled' | 'subtle' | 'outline';
export type BadgeIcon = 'left' | 'right' | 'icon-only' | 'none';

export interface BadgeProps {
  color?: BadgeColor;
  style?: BadgeStyle;
  icon?: BadgeIcon;
  label?: string;
  iconNode?: React.ReactNode;
}

const colorFilled: Record<BadgeColor, string> = {
  primary: 'bg-[var(--bg-primary)]  text-[var(--text-primary)]',
  success: 'bg-[var(--bg-success)]  text-[var(--text-success)]',
  error:   'bg-[var(--bg-error)]    text-[var(--text-error)]',
  warning: 'bg-[var(--bg-warning)]  text-[var(--text-warning)]',
  neutral: 'bg-[var(--bg-neutral)]  text-[var(--text-secondary)]',
  info:    'bg-[var(--bg-info)]     text-[var(--text-info)]',
};

const colorSubtle: Record<BadgeColor, string> = {
  primary: 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-primary)]',
  success: 'bg-[var(--bg-success)] text-[var(--text-success)] border border-[var(--border-success)]',
  error:   'bg-[var(--bg-error)]   text-[var(--text-error)]   border border-[var(--border-error)]',
  warning: 'bg-[var(--bg-warning)] text-[var(--text-warning)] border border-[var(--border-warning)]',
  neutral: 'bg-[var(--bg-neutral)] text-[var(--text-secondary)] border border-[var(--border-default)]',
  info:    'bg-[var(--bg-info)]    text-[var(--text-info)]    border border-[var(--border-info)]',
};

const colorOutline: Record<BadgeColor, string> = {
  primary: 'border border-[var(--border-primary)] text-[var(--text-primary)]',
  success: 'border border-[var(--border-success)] text-[var(--text-success)]',
  error:   'border border-[var(--border-error)]   text-[var(--text-error)]',
  warning: 'border border-[var(--border-warning)] text-[var(--text-warning)]',
  neutral: 'border border-[var(--border-default)] text-[var(--text-secondary)]',
  info:    'border border-[var(--border-info)]    text-[var(--text-info)]',
};

const DefaultIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

export function Badge({
  color = 'primary',
  style = 'filled',
  icon = 'none',
  label = 'Badge',
  iconNode,
}: BadgeProps) {
  const colorClass = style === 'filled' ? colorFilled[color] : style === 'subtle' ? colorSubtle[color] : colorOutline[color];
  const IconEl = iconNode ?? <DefaultIcon />;

  return (
    <span className={[
      'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold',
      colorClass,
    ].join(' ')}>
      {(icon === 'left' || icon === 'icon-only') && <span className="shrink-0">{IconEl}</span>}
      {icon !== 'icon-only' && <span>{label}</span>}
      {icon === 'right' && <span className="shrink-0">{IconEl}</span>}
    </span>
  );
}
