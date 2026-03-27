import React from 'react';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
  showFirstLast?: boolean;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
);

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({ currentPage = 1, totalPages = 10, onChange, showFirstLast = false }: PaginationProps) {
  const pages = getPages(currentPage, totalPages);

  const btnBase = 'inline-flex items-center justify-center w-9 h-9 rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]';
  const btnDefault = 'text-[var(--text-secondary)] hover:bg-[var(--bg-disabled)] hover:text-[var(--text-bold)]';
  const btnActive = 'bg-[var(--button-primary)] text-[var(--button-text-on-filled)]';
  const btnDisabled = 'text-[var(--text-disabled)] cursor-not-allowed';

  return (
    <nav aria-label="Pagination" className="inline-flex items-center gap-1">
      <button
        onClick={() => onChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={[btnBase, currentPage === 1 ? btnDisabled : btnDefault].join(' ')}
      >
        <ChevronLeft />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 inline-flex items-center justify-center text-[var(--text-tertiary)] text-sm">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onChange?.(page as number)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            className={[btnBase, page === currentPage ? btnActive : btnDefault].join(' ')}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={[btnBase, currentPage === totalPages ? btnDisabled : btnDefault].join(' ')}
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
