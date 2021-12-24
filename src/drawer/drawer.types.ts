import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

export enum DrawerSize {
  Small = '400px',
  Medium = '600px',
  Large = '800px',
}

export interface DrawerRef<T = ComponentType<unknown>, R = unknown> {
  afterClosed: Observable<R>;
  afterOpen: Observable<void>;
  close(result?: R): void;
  open(): void;
  componentInstance: T | null;
}
