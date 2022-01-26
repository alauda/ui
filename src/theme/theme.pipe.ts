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
import { cssVar, rgbColor, rgbaColor } from './utils';

@Pipe({ name: 'auiRgbColor', pure: true })
export class RgbColorPipe implements PipeTransform {
  transform = rgbColor;
}

@Pipe({ name: 'auiRgbaColor', pure: true })
export class RgbaColorPipe implements PipeTransform {
  transform = rgbaColor;
}

@Pipe({ name: 'auiCssVar', pure: true })
export class CssVarPipe implements PipeTransform {
  transform = cssVar;
}

@Pipe({ name: 'auiThemePicker', pure: false })
export class ThemePickerPipe<T> implements PipeTransform, OnDestroy {
  private currentTheme: Theme;
  private readonly destroy$$ = new Subject<void>();

  constructor(themeService: ThemeService, cdr: ChangeDetectorRef) {
    themeService.currentTheme$
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
    if (Array.isArray(v)) {
      return v[this.currentTheme === 'light' ? 0 : 1];
    }
    return v[this.currentTheme];
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
