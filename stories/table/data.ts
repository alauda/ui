export const DATA_SOURCE: Element[] = [
  { id: 1, name: 'element1', displayName: 'Element One', value: 5 },
  { id: 2, name: 'element1', displayName: 'Element Two', value: 8 },
  { id: 3, name: 'element1', displayName: 'Element Three', value: 2 },
  { id: 4, name: 'element1', displayName: 'Element Four', value: 9 },
  { id: 5, name: 'element1', displayName: 'Element Five', value: 3 },
  { id: 6, name: 'element1', displayName: 'Element Six', value: 4 },
];

export interface Element {
  id: number;
  name: string;
  displayName: string;
  value: number;
}
