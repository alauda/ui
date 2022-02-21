import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonFormControl } from '../form/public-api';
import { Bem, buildBem } from '../utils';

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

  override writeValue(value: boolean) {
    this.value$$.next(value);
  }

  onSwitch() {
    if (this.disabled) {
      return;
    }
    this.emitValueChange(!this.snapshot.value);
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
