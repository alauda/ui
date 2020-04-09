import { InlineAlertType } from './inline-alert.types';

export const iconMap = {
  [InlineAlertType.Success]: 'check_circle_s',
  [InlineAlertType.Warning]: 'exclamation_circle_s',
  [InlineAlertType.Error]: 'exclamation_triangle_s',
  [InlineAlertType.Info]: 'info_circle_s',
};
