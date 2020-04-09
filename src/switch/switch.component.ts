import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CommonFormControl } from '../form/public-api';
import { Bem, buildBem } from '../utils/bem';

const prefix = 'aui-switch';

@Component({
  selector: 'aui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent extends CommonFormControl<boolean> {
  bem: Bem = buildBem(prefix);

  @Input()
  loading = false;

  checked = false;

  value$: Observable<boolean> = this.value$$.asObservable().pipe(
    tap(value => {
      this.checked = value;
    }),
  );

  writeValue(value: boolean) {
    this.value$$.next(value);
  }

  onSwitch() {
    if (this.disabled) {
      return;
    }
    this.emitValueChange(!this.checked);
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
