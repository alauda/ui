import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { CommonFormControl } from '../../form/common-form';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { ComponentSize } from '../../types';
import { DatePickerType } from '../calendar/constant';
import { DatePickerPanelComponent } from '../calendar/date-picker-panel/component';
import { DateNavRange, DisabledTimeFn } from '../date-picker.type';
import { DatePickerTriggerComponent } from '../trigger/trigger.component';

@Component({
  selector: 'aui-date-picker',
  templateUrl: './date-picker.template.html',
  styleUrls: ['./date-picker.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    DatePickerTriggerComponent,
    TooltipDirective,
    DatePickerPanelComponent,
    FormsModule,
  ],
})
export class DatePickerComponent
  extends CommonFormControl<ConfigType, Dayjs>
  implements OnInit
{
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  format: string;

  @Input()
  showTime = false;

  @Input()
  type = DatePickerType.Day;

  @Input()
  size = ComponentSize.Medium;

  @Input()
  disabledDate: (date: Dayjs, type: DateNavRange) => boolean = () => false;

  @Input()
  disabledTime: DisabledTimeFn = () => null;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Input()
  weekStartDay = 0;

  @Input()
  showFooter = true;

  @Input()
  footerTemplate: TemplateRef<unknown>;

  @Input()
  extraFooter: TemplateRef<unknown>;

  @Input()
  placeholder: string;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  value: Dayjs;
  DatePickerType = DatePickerType;

  ngOnInit() {
    if (!this.format) {
      this.format = this.getDefaultFormat(this.type);
      this.cdr.markForCheck();
    }
  }

  override valueIn(obj: ConfigType) {
    return obj ? dayjs(obj) : null;
  }

  override writeValue(obj: Dayjs) {
    super.writeValue(obj);
    this.value = obj;
    this.cdr.markForCheck();
  }

  private getDefaultFormat(type = DatePickerType.Day) {
    return type === DatePickerType.Year
      ? 'YYYY'
      : type === DatePickerType.Month
      ? 'YYYY-MM'
      : this.showTime
      ? 'YYYY-MM-DD HH:mm:ss'
      : 'YYYY-MM-DD';
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
