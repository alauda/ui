import { TemplateRef } from '@angular/core';

export function isUndefined(val: unknown): boolean {
  return val === undefined;
}

export const last = <T>(values: T[]) => values?.[values.length - 1];

export const isTemplateRef = (label: any): label is TemplateRef<unknown> =>
  label instanceof TemplateRef;
export const isString = (label: any): label is string =>
  typeof label === 'string';
export const handlePixel = (value: number | string) =>
  Number.isNaN(+value) ? (value as string) : value + 'px';
