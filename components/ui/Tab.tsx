import React from 'react';

export type TabStyle = 'underline' | 'filled' | 'pill';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem { value: string; label: string; icon?: React.ReactNode; badge?: number; disabled?: boolean; }

export interface TabProps {
  style?: TabStyle;
  size?: TabSize;
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
}

const sizeMap: Record<TabSize, { text: string; px: string; py: string }> = {
  sm: { text: 'text-xs', px: 'px-3', py: 'py-2' },
  md: { text: 'text-sm', px: 'px-4', py: 'py-2.5' },
  lg: { text: 'text-base', px: 'px-5', py: 'py-3' },
};

export function Tab({ style = 'underline', size = 'md', items, value, onChange }: TabProps) {
  const { text, px, py } = sizeMap[size];
  const isUnderline = style === 'underline';
  const isPill = style === 'pill';

  return (
    <div
      role="tablist"
      className={[
        'flex',
        isUnderline ? 'border-b border-[var(--border-default)]' : 'bg-[var(--bg-disabled)] rounded-full p-1 gap-1',
      ].join(' ')}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        const isDisabled = item.disabled;

        const activeClass = isUnderline
          ? isActive ? 'border-b-2 border-[var(--button-primary)] text-[var(--text-primary)] -mb-px' : 'border-b-2 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-bold)] -mb-px'
          : isPill
            ? isActive ? 'bg-[var(--bg-surface)] text-[var(--text-bold)] shadow-sm rounded-full' : 'text-[var(--text-secondary)] hover:text-[var(--text-bold)] rounded-full'
            : isActive ? 'bg-[var(--bg-surface)] text-[var(--text-bold)] shadow-sm rounded' : 'text-[var(--text-secondary)] hover:text-[var(--text-bold)] rounded';

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange?.(item.value)}
            className={[
              'inline-flex items-center gap-2 font-semibold transition-colors whitespace-nowrap',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]',
              text, px, py, activeClass,
              isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[var(--button-primary)] text-white text-[10px] font-bold px-1">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
