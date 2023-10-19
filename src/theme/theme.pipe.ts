import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ThemeService } from './theme.service';
import { Theme, ThemeSet } from './theme.types';
import { cssVar, rgbColor, rgbaColor } from './utils';

@Pipe({
  name: 'auiRgbColor',
  pure: true,
  standalone: true,
})
export class RgbColorPipe implements PipeTransform {
  transform: (color: string) => string = rgbColor;
}

@Pipe({
  name: 'auiRgbaColor',
  pure: true,
  standalone: true,
})
export class RgbaColorPipe implements PipeTransform {
  transform: ([color, opacity]: [string, number]) => string = rgbaColor;
}

@Pipe({
  name: 'auiCssVar',
  pure: true,
  standalone: true,
})
export class CssVarPipe implements PipeTransform {
  transform: (value: string) => string = cssVar;
}

@Pipe({
  name: 'auiThemePicker',
  pure: false,
  standalone: true,
})
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
