import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';

export enum DrawerSize {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
}

export abstract class DrawerOptions<T = unknown, C = unknown> {
  abstract title?: string | TemplateRef<C>;
  abstract content?: ComponentType<T> | TemplateRef<C>;
  abstract footer?: string | TemplateRef<C>;
  abstract contentParams?: C; // 不仅作为content的参数，同时是title和footer的上下文
  abstract width?: number;
  abstract size?: DrawerSize; // 内置的宽度尺寸，也可以使用 width 自定义
  abstract offsetY?: string;
  abstract divider?: boolean;
  abstract drawerClass?: string;
  abstract visible?: boolean;
  abstract showClose?: boolean;
  abstract mask?: boolean;
  abstract maskClosable?: boolean; // 点击背景是否关闭抽屉
  abstract hideOnClickOutside?: boolean; // 在抽屉外点击是否关闭抽屉，与 maskClosable 的区别是是否有 mask
}
