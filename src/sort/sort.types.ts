export type SortDirection = '' | 'asc' | 'desc';

export type ArrowViewState = SortDirection | 'active' | 'hint';

export interface Sortable {
  id: string;
  start: 'asc' | 'desc';
}

export interface Sort {
  active: string;
  direction: SortDirection;
}
