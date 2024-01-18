import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { I18nService } from './i18n.service';

@Pipe({
  name: 'auiI18n',
  pure: false,
  standalone: true,
})
export class I18nPipe implements PipeTransform, OnDestroy {
  private readonly destroy$$ = new Subject<void>();

  constructor(
    private readonly i18n: I18nService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.i18n.localeChange$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(() => this.cdr.markForCheck());
  }

  transform(value: any, data?: Record<string, string>) {
    return this.i18n.translate(value, data);
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
