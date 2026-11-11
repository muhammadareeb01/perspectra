'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'tint-theme';

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const initial: ThemeMode = stored === 'dark' || stored === 'light' ? stored : 'light';
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
