export type SortDirection = 'asc' | 'desc' | '';

export type ArrowViewState = SortDirection | 'hint' | 'active';

export interface Sortable {
  id: string;
  start: 'asc' | 'desc';
}

export interface Sort {
  active: string;
  direction: SortDirection;
}
