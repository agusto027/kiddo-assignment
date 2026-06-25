export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  success: string;
  error: string;
}

export interface ThemePayload {
  primary: string;
  background: string;
  secondary?: string;
  surface?: string;
  text?: string;
  textSecondary?: string;
  accent?: string;
  border?: string;
  success?: string;
  error?: string;
}

export const DEFAULT_THEME: Theme = {
  primary: '#FF9933',
  secondary: '#4A90D9',
  background: '#FFF5E6',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#666680',
  accent: '#FF6B6B',
  border: '#E8E8F0',
  success: '#22C55E',
  error: '#EF4444',
};

export function mergeThemePayload(payload: ThemePayload): Theme {
  return {
    ...DEFAULT_THEME,
    primary: payload.primary,
    background: payload.background,
    secondary: payload.secondary ?? DEFAULT_THEME.secondary,
    surface: payload.surface ?? DEFAULT_THEME.surface,
    text: payload.text ?? DEFAULT_THEME.text,
    textSecondary: payload.textSecondary ?? DEFAULT_THEME.textSecondary,
    accent: payload.accent ?? DEFAULT_THEME.accent,
    border: payload.border ?? DEFAULT_THEME.border,
    success: payload.success ?? DEFAULT_THEME.success,
    error: payload.error ?? DEFAULT_THEME.error,
  };
}
