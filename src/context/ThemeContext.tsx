import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Theme, ThemePayload } from '../types/theme';
import { DEFAULT_THEME, mergeThemePayload } from '../types/theme';

interface ThemeContextValue {
  theme: Theme;
  setThemeFromPayload: (payload: ThemePayload) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemePayload;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    initialTheme ? mergeThemePayload(initialTheme) : DEFAULT_THEME,
  );

  const setThemeFromPayload = useCallback((payload: ThemePayload) => {
    setTheme(mergeThemePayload(payload));
  }, []);

  const value = useMemo(
    () => ({ theme, setThemeFromPayload }),
    [theme, setThemeFromPayload],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context.theme;
}

export function useThemeActions() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeActions must be used within ThemeProvider');
  }
  return { setThemeFromPayload: context.setThemeFromPayload };
}
