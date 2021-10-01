import { TemplateRef } from '@angular/core';

export interface SelectOption {
  label: string | TemplateRef<unknown>;
  labelContext?: unknown;
}

export interface SelectFilterOption<T> extends SelectOption {
  value: T;
}

export type OptionFilterFn<T> = (
  filter: string,
  option: SelectFilterOption<T>,
) => boolean;

export type TrackFn<T, R = unknown> = (value: T) => R;

export type TagClassFn<
  V,
  T extends string | TemplateRef<unknown> = string | TemplateRef<unknown>
> = (
  label: T,
  value: V,
) => // tslint:disable-next-line: max-union-size
string | string[] | Set<string> | { [className: string]: unknown };

export enum SelectAllStatus {
  Empty = '',
  Checked = 'checked',
  Indeterminate = 'indeterminate',
}
