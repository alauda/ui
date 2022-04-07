import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';

import { auiIcons } from './icons';
import {
  getAuiIconFailedToLoadCustomIconFile,
  getAuiIconNoHttpProviderError,
} from './utils';

@Injectable()
export class IconRegisterService {
  private defaultIconPrefix = 'aui-icon';
  private readonly doc: Document;

  constructor(
    @Optional()
    @Inject(DOCUMENT)
    document: any,
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
      .subscribe(
        res => {
          this.registerSvgSymbolsByString(res);
        },
        () => {
          throw getAuiIconFailedToLoadCustomIconFile(url);
        },
      );
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

// eslint-disable-next-line sonar/function-name
export function ICON_REGISTER_PROVIDER_FACTORY(
  parentRegister: IconRegisterService,
  document: Document,
  httpClient: HttpClient,
) {
  return parentRegister || new IconRegisterService(document, httpClient);
}

export const ICON_REGISTER_SERVICE_PROVIDER = {
  provide: IconRegisterService,
  deps: [
    [new Optional(), new SkipSelf(), IconRegisterService],
    [new Optional(), DOCUMENT],
    [new Optional(), HttpClient],
  ],
  useFactory: ICON_REGISTER_PROVIDER_FACTORY,
};
