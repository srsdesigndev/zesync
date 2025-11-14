export type Theme = 'light' | 'dark';

const THEME_KEY = 'zesync_theme';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as Theme) || 'light';
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.className = theme;
};

export const initTheme = (): void => {
  const theme = getTheme();
  document.documentElement.className = theme;
};