import React from 'react';
import { Button } from './Button';

export type NavbarState = 'default' | 'scrolled';

export interface NavbarLink { label: string; href?: string; active?: boolean; }

export interface NavbarProps {
  state?: NavbarState;
  logo?: React.ReactNode;
  links?: NavbarLink[];
  showAuth?: boolean;
}

const DefaultLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded bg-[var(--button-primary)]" />
    <span className="font-bold text-sm text-[var(--text-bold)]">Design System</span>
  </div>
);

export function Navbar({
  state = 'default',
  logo,
  links = [
    { label: 'Home', active: true },
    { label: 'Components' },
    { label: 'Tokens' },
    { label: 'Docs' },
  ],
  showAuth = true,
}: NavbarProps) {
  const isScrolled = state === 'scrolled';

  return (
    <header
      role="banner"
      className={[
        'w-full flex items-center justify-between px-6 h-14 border-b',
        'bg-[var(--bg-surface)] border-[var(--border-default)]',
        isScrolled ? 'shadow-md' : '',
      ].join(' ')}
    >
      {/* Logo */}
      <div className="shrink-0">{logo ?? <DefaultLogo />}</div>

      {/* Nav links */}
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-1">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href ?? '#'}
                aria-current={link.active ? 'page' : undefined}
                className={[
                  'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                  link.active
                    ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-bold)] hover:bg-[var(--bg-disabled)]',
                ].join(' ')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Auth */}
      {showAuth && (
        <div className="flex items-center gap-2">
          <Button type="tertiary" size="small" label="Log in" />
          <Button type="primary" size="small" label="Sign up" />
        </div>
      )}
    </header>
  );
}
