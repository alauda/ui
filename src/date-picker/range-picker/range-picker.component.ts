import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { CommonFormControl } from '../../form';
import { ComponentSize } from '../../internal/types';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { DateRangePickerPanelComponent } from '../calendar/range-picker-panel/component';
import { DisabledDateFn, DisabledTimeFn } from '../date-picker.type';
import { DatePickerTriggerComponent } from '../trigger/trigger.component';

@Component({
    selector: 'aui-range-picker',
    templateUrl: './range-picker.template.html',
    styleUrls: ['./range-picker.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangePickerComponent),
            multi: true,
        },
    ],
    imports: [
        DatePickerTriggerComponent,
        TooltipDirective,
        DateRangePickerPanelComponent,
        FormsModule,
    ]
})
export class RangePickerComponent extends CommonFormControl<
  ConfigType[],
  Dayjs[]
> {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  format: string;

  @Input()
  showFooter = true;

  @Input()
  showTime = true;

  @Input()
  disabledDate: DisabledDateFn = () => false;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Input()
  disabledTime: { left: DisabledTimeFn; right: DisabledTimeFn } = {
    left: () => null,
    right: () => null,
  };

  @Input()
  weekStartDay = 0;

  @Input()
  size: ComponentSize;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  value: [Dayjs, Dayjs];

  override valueIn(obj: [ConfigType, ConfigType]) {
    return obj?.map(i => dayjs(i));
  }

  override writeValue(obj: [Dayjs, Dayjs]) {
    super.writeValue(obj);
    this.value = obj;
    this.cdr.markForCheck();
  }

  clearValue() {
    this.value = null;
    this.emitValue(null);
  }

  tooltipVisibleChange(visible: boolean) {
    this.visibleChange.next(visible);
    if (!visible) {
      this.emitValue(this.value);
    }
  }
}
