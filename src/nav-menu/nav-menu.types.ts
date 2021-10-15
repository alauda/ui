export type NavItemKey = string;

export interface NavItemConfig {
  label: string;
  key: NavItemKey;
  href?: string;
  icon?: string;
  stage?: 'Alpha' | 'Beta';
  divider?: boolean;
  children?: NavItemConfig[];
  [key: string]: any;
}

export interface NavGroupConfig {
  title?: string;
  items: NavItemConfig[];
}
