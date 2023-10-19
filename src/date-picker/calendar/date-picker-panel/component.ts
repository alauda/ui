import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { ButtonComponent } from '../../../button/button.component';
import { CommonFormControl } from '../../../form/common-form';
import { I18nPipe } from '../../../i18n/i18n.pipe';
import {
  HOUR_ITEMS,
  MINUTE_ITEMS,
  SECOND_ITEMS,
  TimePickerComponent,
  TimePickerModel,
} from '../../../time-picker';
import { DateNavRange, DisabledTimeFn } from '../../date-picker.type';
import { DatePickerType } from '../constant';
import { CalendarFooterComponent } from '../footer/component';
import { CalendarHeaderComponent } from '../header/component';
import { PickerPanelComponent } from '../panel/picker-panel';
import {
  getNavRangeByType,
  getTimePickerModel,
  getTypeByNavRange,
  nextNavRangeType,
  updateDate,
  updateDateByTimeModel,
} from '../util';

@Component({
  selector: 'aui-date-picker-panel',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerPanelComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CalendarHeaderComponent,
    PickerPanelComponent,
    NgIf,
    NgTemplateOutlet,
    CalendarFooterComponent,
    TimePickerComponent,
    FormsModule,
    ButtonComponent,
    I18nPipe,
  ],
})
export class DatePickerPanelComponent extends CommonFormControl<Dayjs> {
  @Input()
  clearable = true;

  @Input()
  clearText: string;

  @Input()
  set type(type: DatePickerType) {
    this.navRange = getNavRangeByType(type);
    this._type = type;
  }

  get type() {
    return this._type;
  }

  private _type: DatePickerType;

  @Input()
  showTime = false;

  @Input()
  disabledDate: (date: Dayjs, type: DateNavRange) => boolean = () => false;

  @Input()
  disabledTime: DisabledTimeFn = () => null;

  @Input()
  weekStartDay = 0;

  @Input()
  showFooter = true;

  @Input()
  footerTemplate: TemplateRef<unknown>;

  @Input()
  extraFooter: TemplateRef<unknown>;

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  @Output()
  confirm = new EventEmitter<Dayjs>();

  @Output()
  clear = new EventEmitter<void>();

  private _cacheSelectedDate: Dayjs;
  private _cacheDisabledTimeFn: ReturnType<DisabledTimeFn>;

  getDisabledTimeFn(
    selectedDate: Dayjs,
    type: keyof ReturnType<DisabledTimeFn>,
  ) {
    if (selectedDate !== this._cacheSelectedDate) {
      this._cacheDisabledTimeFn = combineDisabledTimeFn(
        this._disabledTimeFn.bind(this),
        this.disabledTime,
      )(selectedDate);
      this._cacheSelectedDate = selectedDate;
    }
    return this._cacheDisabledTimeFn?.[type];
  }

  navRange: DateNavRange;

  get currentNavType() {
    return getTypeByNavRange(this.navRange);
  }

  anchor: Dayjs;

  selectedDate: Dayjs;

  selectedTime: TimePickerModel;

  DateNavRange = DateNavRange;
  DatePickerType = DatePickerType;

  override writeValue(obj: Dayjs) {
    super.writeValue(obj);
    this.selectedDate = obj;
    this.selectedTime = getTimePickerModel(obj);
    this.anchor = obj || dayjs();
    this.cdr.markForCheck();
  }

  panelValueChange(value: Dayjs) {
    this.selectedDate = updateDate(
      this.selectedDate || dayjs(),
      value,
      this.currentNavType,
    );
    this.anchor = this.selectedDate;
    this.selectedDate = updateDateByTimeModel(
      this.selectedDate,
      this.selectedTime,
    );
    if (this.type === this.currentNavType) {
      this.confirmValue(this.selectedDate, !this.showTime);
    }
    const nextNavRange = nextNavRangeType(
      this.navRange,
      getNavRangeByType(this.type),
    );
    if (this.navRange !== nextNavRange) {
      this.navRange = nextNavRange;
    }
  }

  confirmValue(value?: ConfigType, closeAfterConfirm = true) {
    this.emitValue(value ? dayjs(value) : this.selectedDate);
    closeAfterConfirm && this.confirm.next(null);
  }

  timeDateChange(time: TimePickerModel) {
    if (!this.selectedDate) {
      return;
    }
    this.selectedDate = updateDateByTimeModel(this.selectedDate, time);
    this.emitValue(this.selectedDate);
  }

  setToday() {
    this.confirmValue(dayjs(), true);
  }

  clearValue() {
    this.selectedTime = null;
    this.clear.next();
  }

  private _disabledTimeFn(
    selectedDate: Dayjs,
  ): Record<keyof ReturnType<DisabledTimeFn>, () => number[]> {
    const getTimeFilter = (
      date: Dayjs,
      comparator: (a: number, b: number) => boolean,
    ) => ({
      hours: () => HOUR_ITEMS.filter(item => comparator(item, date.hour())),
      minutes: (hour?: number) =>
        hour === date.hour()
          ? MINUTE_ITEMS.filter(item => comparator(item, date.minute()))
          : [],
      seconds: (hour?: number, minute?: number) =>
        hour === date.hour() && minute === date.minute()
          ? SECOND_ITEMS.filter(item => comparator(item, date.second()))
          : [],
    });

    if (selectedDate) {
      if (this.minDate && selectedDate.isSame(this.minDate, 'date')) {
        return getTimeFilter(this.minDate, (a, b) => a < b);
      }
      if (this.maxDate && selectedDate.isSame(this.maxDate, 'date')) {
        return getTimeFilter(this.maxDate, (a, b) => a > b);
      }
    }

    return {
      hours: () => [],
      minutes: () => [],
      seconds: () => [],
    };
  }
}

function combineDisabledTimeFn(
  ...disabledFnList: DisabledTimeFn[]
): DisabledTimeFn {
  return (date: Dayjs) => ({
    hours: () =>
      Array.from(
        new Set(disabledFnList.flatMap(fn => fn(date)?.hours() || [])),
      ),
    minutes: (hour?: number) =>
      Array.from(
        new Set(disabledFnList.flatMap(fn => fn(date)?.minutes(hour) || [])),
      ),
    seconds: (hour?: number, minute?: number) =>
      Array.from(
        new Set(
          disabledFnList.flatMap(fn => fn(date)?.seconds(hour, minute) || []),
        ),
      ),
  });
}
