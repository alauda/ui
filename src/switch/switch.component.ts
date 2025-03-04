import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonFormControl } from '../form';
import { Bem, buildBem } from '../internal/utils';

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
    imports: [NgClass]
})
export class SwitchComponent extends CommonFormControl<boolean> {
  bem: Bem = buildBem(prefix);

  @Input()
  loading = false;

  onSwitch() {
    if (this.disabled) {
      return;
    }
    this.emitValue(!this.model);
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
