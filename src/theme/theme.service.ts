import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  getCurrentColorMode(): ColorMode {
    return (
      (document
        .querySelector('html')
        .getAttribute('aui-color-mode') as ColorMode) || 'light'
    );
  }

  setColorMode(mode: ColorMode) {
    document.querySelector('html').setAttribute('aui-color-mode', mode);
  }
}

export type ColorMode = 'auto' | 'light' | 'dark';
