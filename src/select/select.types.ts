import { TemplateRef } from '@angular/core';

export interface SelectOption {
  label: TemplateRef<unknown> | string;
  labelContext?: unknown;
}

export interface SelectFilterOption<T> extends SelectOption {
  disabled?: boolean;
  value: T;
}

export type OptionFilterFn<T> = (
  filter: string,
  option: SelectFilterOption<T>,
) => boolean;

export type TrackFn<T, R = unknown> = (value: T) => R;

export type TagClassFn<
  V,
  T extends TemplateRef<unknown> | string = TemplateRef<unknown> | string,
> = (
  label: T,
  value: V,
) => Set<string> | string[] | string | { [className: string]: unknown };

export enum SelectAllStatus {
  Empty = '',
  Checked = 'checked',
  Indeterminate = 'indeterminate',
}
