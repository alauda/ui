import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';

import { ValueOf } from '../types';

export const DrawerSize = {
  Small: 'small',
  Medium: 'medium',
  Big: 'big',
} as const;

export type DrawerSize = ValueOf<typeof DrawerSize>;

export interface DrawerOptions<T = unknown, C extends object = object> {
  title?: string | TemplateRef<C>;
  content?: ComponentType<T> | TemplateRef<C>;
  footer?: string | TemplateRef<C>;
  contentParams?: C; // 不仅作为content的参数，同时是title和footer的上下文
  width?: number;
  size?: DrawerSize; // 内置的宽度尺寸，也可以使用 width 自定义
  offsetY?: string;
  divider?: boolean;
  drawerClass?: string;
  visible?: boolean;
  showClose?: boolean;
  mask?: boolean;
  maskClosable?: boolean; // 点击背景是否关闭抽屉
  hideOnClickOutside?: boolean; // 在抽屉外点击是否关闭抽屉，与 maskClosable 的区别是是否有 mask
}
