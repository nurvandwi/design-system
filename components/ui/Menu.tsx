import React from 'react';

export type MenuItemState = 'default' | 'active' | 'hover' | 'disabled';
export type MenuItemType = 'parent' | 'child';

export interface MenuItem {
  label: string;
  type?: MenuItemType;
  state?: MenuItemState;
  icon?: React.ReactNode;
  badge?: number;
  children?: Omit<MenuItem, 'children'>[];
}

export interface MenuProps {
  items?: MenuItem[];
  header?: string;
}

const DefaultIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

function MenuItemRow({ item }: { item: MenuItem }) {
  const state = item.state ?? 'default';
  const isActive = state === 'active';
  const isDisabled = state === 'disabled';
  const isChild = item.type === 'child';

  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={[
        'w-full flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors',
        isChild ? 'pl-9' : '',
        isActive
          ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
          : isDisabled
            ? 'text-[var(--text-disabled)] cursor-not-allowed'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-disabled)] hover:text-[var(--text-bold)]',
      ].join(' ')}
    >
      {!isChild && (
        <span className={['shrink-0', isActive ? 'text-[var(--text-primary)]' : 'text-[var(--icon-base)]'].join(' ')}>
          {item.icon ?? <DefaultIcon />}
        </span>
      )}
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge !== undefined && (
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[var(--button-primary)] text-[var(--button-text-on-filled)] text-[10px] font-bold px-1">
          {item.badge}
        </span>
      )}
    </button>
  );
}

export function Menu({ items = [], header }: MenuProps) {
  return (
    <nav aria-label="Main navigation" className="flex flex-col w-56 gap-0.5">
      {header && (
        <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          {header}
        </p>
      )}
      <ul className="flex flex-col gap-0.5">
        {items.map((item, i) => (
          <li key={i}>
            <MenuItemRow item={item} />
            {item.children?.map((child, j) => (
              <MenuItemRow key={j} item={{ ...child, type: 'child' }} />
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
}
