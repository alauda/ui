import { TemplateRef } from '@angular/core';

export function isUndefined(val: unknown): boolean {
  return val === undefined;
}

export const last = <T>(values: T[]) => values?.[values.length - 1];

export const isTemplateRef = (
  label: string | TemplateRef<unknown>,
): label is TemplateRef<unknown> => label instanceof TemplateRef;
