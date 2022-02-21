import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CommonFormControl } from '../../form/public-api';
import { RadioSize } from '../radio.types';

@Component({
  selector: 'aui-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent extends CommonFormControl<any> {
  private readonly size$$ = new BehaviorSubject<RadioSize>(RadioSize.Medium);
  private readonly isPlain$$ = new BehaviorSubject<boolean>(true);
  private readonly name$$ = new BehaviorSubject<string>('');

  @Input()
  set size(val: RadioSize) {
    this.size$$.next(val);
  }

  @Input()
  direction: 'row' | 'column' = 'row';

  /**
   * @deprecated use `plain` instead
   */
  @Input()
  set isPlain(val: boolean) {
    this.plain = val;
  }

  @Input()
  set plain(val: boolean) {
    this.isPlain$$.next(val);
  }

  @Input()
  set name(val: string) {
    this.name$$.next(val);
  }

  size$: Observable<RadioSize> = this.size$$
    .asObservable()
    .pipe(distinctUntilChanged());

  isPlain$: Observable<boolean> = this.isPlain$$
    .asObservable()
    .pipe(distinctUntilChanged());

  name$: Observable<string> = this.name$$
    .asObservable()
    .pipe(distinctUntilChanged());

  override writeValue(value: any) {
    this.value$$.next(value);
  }

  onRadioChange(value: any) {
    this.emitValueChange(value);
  }

  onRadioBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
