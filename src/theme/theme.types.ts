export type Theme = 'light' | 'dark';
export type ThemeMode = 'system' | 'light' | 'dark';
export type ThemeSet<T> = [T, T] | Record<Theme, T> | ((theme: Theme) => T);
