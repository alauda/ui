export interface CascaderOption<T> {
  label: string;
  value: T;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  children?: Array<CascaderOption<T>>;
}

export interface SearchedCascaderOption<R, T extends R[]>
  extends CascaderOption<T> {
  path: Array<CascaderOption<R>>;
}
