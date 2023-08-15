import { Injectable } from '@angular/core';
import { ReplaySubject, distinctUntilChanged } from 'rxjs';

import { Theme, ThemeMode } from './theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly htmlEl: HTMLHtmlElement;
  private browserTheme: Theme;
  private themeMode: ThemeMode;

  private readonly currentAppTheme$$ = new ReplaySubject<Theme>(1);

  readonly currentTheme$ = this.currentAppTheme$$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() {
    this.htmlEl = document.querySelector('html')!;

    switch (this.htmlEl.getAttribute('aui-theme-mode')) {
      case 'dark': {
        this.themeMode = 'dark';
        break;
      }
      case 'light': {
        this.themeMode = 'light';
        break;
      }
      case 'system': {
        this.themeMode = 'system';
        break;
      }
      default: {
        this.themeMode = 'light';
      }
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.browserTheme = darkModeQuery.matches ? 'dark' : 'light';

    darkModeQuery.addEventListener('change', ({ matches }) => {
      this.browserTheme = matches ? 'dark' : 'light';
      if (this.themeMode === 'system') {
        this.themeChanged();
      }
    });

    this.themeChanged();
  }

  setThemeMode(mode: ThemeMode) {
    this.htmlEl.setAttribute('aui-theme-mode', mode);
    this.themeMode = mode;
    this.themeChanged();
  }

  currentTheme() {
    return this.themeMode === 'system' ? this.browserTheme : this.themeMode;
  }

  private themeChanged() {
    this.currentAppTheme$$.next(this.currentTheme());
  }
}
