import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { auiIcons } from './icons';
import {
  getAuiIconFailedToLoadCustomIconFile,
  getAuiIconNoHttpProviderError,
} from './utils';

@Injectable({
  providedIn: 'root',
})
export class IconRegisterService {
  private defaultIconPrefix = 'aui-icon';
  private readonly doc: Document;

  constructor(
    @Optional()
    @Inject(DOCUMENT)
    document: Document,
    @Optional() private readonly httpClient: HttpClient,
  ) {
    this.doc = document;
    this.registerSvgSymbolsByString(auiIcons);
  }

  getDefaultIconPrefix(): string {
    return this.defaultIconPrefix;
  }

  replaceDefaultIconPrefix(prefix: string): void {
    this.defaultIconPrefix = prefix;
  }

  registerSvgSymbolsByUrl(url: string) {
    if (!this.httpClient) {
      throw getAuiIconNoHttpProviderError();
    }
    this.httpClient
      .get(url, {
        responseType: 'text',
      })
      .subscribe({
        next: res => {
          this.registerSvgSymbolsByString(res);
        },
        error() {
          throw getAuiIconFailedToLoadCustomIconFile(url);
        },
      });
  }

  registerSvgSymbolsByString(str: string) {
    this.appendSvg(str);
  }

  private appendSvg(svgString: string) {
    const setEl = this.doc.createElement('div');
    setEl.className = 'aui-icon-set';
    setEl.style.display = 'none';
    setEl.innerHTML = svgString;
    this.doc.body.append(setEl);
  }
}
