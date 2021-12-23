import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export enum DrawerSize {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
}

export abstract class DrawerRef<T = ComponentType<any>, R = any> {
  abstract afterClosed: Observable<R>;
  abstract afterOpen: Observable<void>;
  abstract dispose(result?: R): void;
  abstract open(): void;
  abstract componentInstance: T | null;

  abstract title?: string | TemplateRef<unknown>;
  abstract footer?: string | TemplateRef<unknown>;
  abstract size?: DrawerSize;
  abstract offsetY?: string;
  abstract visible?: boolean;
  abstract hideOnClickOutside?: boolean;
  abstract showClose?: boolean;
  abstract drawerClass?: string;
  abstract mask?: boolean;
  abstract maskClosable?: boolean;
  abstract width?: number;
}
