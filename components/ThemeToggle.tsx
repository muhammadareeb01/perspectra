'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.05 3.05l1.13 1.13M11.82 11.82l1.13 1.13M3.05 12.95l1.13-1.13M11.82 4.18l1.13-1.13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.8a5.8 5.8 0 1 0 5.4 7.75A5.2 5.2 0 0 1 8 1.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}
