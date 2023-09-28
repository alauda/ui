import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { I18nService } from './i18n.service';
import { StringMap } from './i18n.type';

@Pipe({
  name: 'auiI18n',
  pure: false,
})
export class I18nPipe implements PipeTransform, OnDestroy {
  private readonly destory$$ = new Subject<void>();

  constructor(
    private readonly i18n: I18nService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.i18n.localeChange$.pipe(takeUntil(this.destory$$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(value: any, data?: StringMap) {
    return this.i18n.translate(value, data);
  }

  ngOnDestroy(): void {
    this.destory$$.next();
  }
}
