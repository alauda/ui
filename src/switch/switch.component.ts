import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonFormControl } from '../form';
import { Bem, buildBem, generateDataTestId } from '../utils';

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

  @HostBinding('attr.data-test')
  override get dataTest() {
    return generateDataTestId(this.elementRef.nativeElement, 'SWITCH');
  }

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
