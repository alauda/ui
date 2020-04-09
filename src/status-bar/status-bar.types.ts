export interface Status {
  type?: StatusType;
  class?: string;
  scale: number;
  [key: string]: any;
}

export enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Pending = 'pending',
}

export enum StatusBarSize {
  Medium = 'medium',
  Small = 'small',
}
