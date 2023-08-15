import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { CommonFormControl } from '../../form';
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
  standalone: true,
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

  onRadioChange(value: any) {
    this.emitValue(value);
  }

  onRadioBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
