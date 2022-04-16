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

export const formatDataTestId = (input: string) => {
  if (!input) return '';
  return input
    .replaceAll('\r', '')
    .replaceAll('\n', '')
    .replaceAll('\\s', '')
    .replaceAll(' ', '')
    .slice(0, 40); // 避免有些text-content 太长不利于阅读，产生的副作用不会影响对元素的识别
};

export const getDataTextContent = (element: HTMLElement, type?: string) => {
  switch (type) {
    case 'INPUT': {
      return (
        element.getAttribute('formcontrolname') ||
        element.getAttribute('name') ||
        element.getAttribute('placeholder') ||
        ''
      );
    }
    default:
      return element.textContent;
  }
};

export const generateDataTestId = (ei: HTMLElement | string, type?: string) => {
  if (typeof ei === 'string') {
    return `AUI-${ei}`;
  }
  const prefix = type ? `AUI-${type}` : ei.nodeName;
  const textContent = getDataTextContent(ei, type);
  return ei.dataset.test || formatDataTestId(`${prefix}/${textContent}`);
};
