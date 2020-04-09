import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';

import { auiIcons } from './icons';
import {
  getAuiIconFailedToLoadCustomIconFile,
  getAuiIconNoHttpProviderError,
} from './utils/errors';

@Injectable()
export class IconRegistryService {
  private defaultIconPrefix = 'aui-icon';
  private readonly doc: Document;

  constructor(
    @Optional()
    @Inject(DOCUMENT)
    document: any,
    @Optional() private readonly httpClient: HttpClient,
  ) {
    this.doc = document;
    this.registrySvgSymbolsByString(auiIcons);
  }

  getDefaultIconPrefix(): string {
    return this.defaultIconPrefix;
  }

  replaceDefaultIconPrefix(prefix: string): void {
    this.defaultIconPrefix = prefix;
  }

  registrySvgSymbolsByUrl(url: string) {
    if (!this.httpClient) {
      throw getAuiIconNoHttpProviderError();
    }
    this.httpClient
      .get(url, {
        responseType: 'text',
      })
      .subscribe(
        res => {
          this.registrySvgSymbolsByString(res);
        },
        () => {
          throw getAuiIconFailedToLoadCustomIconFile(url);
        },
      );
  }

  registrySvgSymbolsByString(str: string) {
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

export function ICON_REGISTRY_PROVIDER_FACTORY(
  parentRegistry: IconRegistryService,
  document: Document,
  httpClient: HttpClient,
) {
  return parentRegistry || new IconRegistryService(document, httpClient);
}

export const ICON_REGISTRY_SERVICE_PROVIDER = {
  provide: IconRegistryService,
  deps: [
    [new Optional(), new SkipSelf(), IconRegistryService],
    [new Optional(), DOCUMENT],
    [new Optional(), HttpClient],
  ],
  useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
