export type ValueOf<T> = T[keyof T];

export const ComponentSize = {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
  Mini: 'mini',
  /**
   * represents default internally, @link https://github.com/angular/vscode-ng-language-service/issues/1147
   */
  Empty: '',
} as const;

export type ComponentSize = ValueOf<typeof ComponentSize>;
