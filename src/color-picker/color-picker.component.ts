import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonFormControl } from '../form/public-api';

@Component({
  selector: 'aui-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent extends CommonFormControl<string> {
  override writeValue(val: string) {
    this.value$$.next(val);
  }

  onInput(event: Event) {
    this.emitValueChange((event.target as HTMLInputElement).value);
  }
}
