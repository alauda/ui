export type Theme = 'dark' | 'light';
export type ThemeMode = 'dark' | 'light' | 'system';
export type ThemeSet<T> = Record<Theme, T> | ((theme: Theme) => T) | [T, T];
