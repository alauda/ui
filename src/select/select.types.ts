import { TemplateRef } from '@angular/core';

export type OptionFilterFn = (
  filter: string,
  option: { label: string | TemplateRef<any>; value: any; labelContext: any },
) => boolean;

export type TrackFn = <T = unknown>(value: T) => T;

export type TagClassFn = (
  label: string,
  value: any,
) => // tslint:disable-next-line: max-union-size
string | string[] | Set<string> | { [className: string]: any };
