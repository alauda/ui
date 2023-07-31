import { TemplateRef } from '@angular/core';

export const last = <T>(values: T[]) => values?.[values.length - 1];

export const isTemplateRef = (label: any): label is TemplateRef<unknown> =>
  label instanceof TemplateRef;

export const isString = (label: any): label is string =>
  typeof label === 'string';

export const handlePixel = (value: number | string) =>
  Number.isNaN(+value) ? (value as string) : value + 'px';

export function getElementOffset(elem: HTMLElement): {
  top: number;
  left: number;
} {
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  const rect = elem.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
  };
}
