import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThemeService } from './theme.service';
import { Theme, ThemeSet } from './theme.types';

@Pipe({ name: 'auiTheme', pure: false })
export class ThemePipe<T> implements PipeTransform, OnDestroy {
  private currentTheme: Theme;
  private readonly destroy$$ = new Subject<void>();

  constructor(themeService: ThemeService, cdr: ChangeDetectorRef) {
    themeService.currentAppTheme$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(theme => {
        this.currentTheme = theme;
        cdr.markForCheck();
      });
  }

  transform(v: ThemeSet<T>) {
    if (v instanceof Function) {
      return v(this.currentTheme);
    }
    return v[this.currentTheme];
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
