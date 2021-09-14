import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Theme, ThemeMode } from './theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly htmlEl: HTMLHtmlElement;
  private browserTheme: Theme;
  private themeMode: ThemeMode;

  private readonly currentAppTheme$$ = new ReplaySubject<Theme>(1);

  currentAppTheme$ = this.currentAppTheme$$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() {
    this.htmlEl = document.querySelector('html');

    switch (this.htmlEl.getAttribute('aui-color-mode')) {
      case 'dark':
        this.themeMode = 'dark';
        break;
      case 'light':
        this.themeMode = 'light';
        break;
      case 'auto':
        this.themeMode = 'auto';
        break;
      default:
        this.themeMode = 'light';
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.browserTheme = darkModeQuery.matches ? 'dark' : 'light';

    darkModeQuery.addEventListener('change', ({ matches }) => {
      this.browserTheme = matches ? 'dark' : 'light';
      if (this.themeMode === 'auto') {
        this.themeChanged();
      }
    });

    this.themeChanged();
  }

  setThemeMode(mode: ThemeMode) {
    this.htmlEl.setAttribute('aui-color-mode', mode);
    this.themeMode = mode;
    this.themeChanged();
  }

  getAppTheme() {
    return this.themeMode === 'auto' ? this.browserTheme : this.themeMode;
  }

  private themeChanged() {
    this.currentAppTheme$$.next(this.getAppTheme());
  }
}
