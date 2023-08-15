import { ValueOf } from '../types';

export const ButtonType = {
  Default: 'default',
  Primary: 'primary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Text: 'text',
  Inline: 'inline',
  /**
   * represents default internally, @link https://github.com/angular/vscode-ng-language-service/issues/1147
   */
  Empty: '',
} as const;

export type ButtonType = ValueOf<typeof ButtonType>;
