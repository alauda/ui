import { ValueOf } from '../types';

export const ButtonType = {
  Default: 'default',
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Info: 'info',
  Text: 'text',
  /**
   * represents default internally, @link https://github.com/angular/vscode-ng-language-service/issues/1147
   */
  Empty: '',
  /**
   * @deprecated use `ButtonType.Danger` instead
   */
  Error: 'error',
} as const;

export type ButtonType = ValueOf<typeof ButtonType>;
