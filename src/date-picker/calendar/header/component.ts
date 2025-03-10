import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { ButtonComponent } from '../../../button/button.component';
import { I18nPipe, I18nService } from '../../../i18n';
import { IconComponent } from '../../../icon/icon.component';
import { buildBem } from '../../../internal/utils';
import { DateNavRange, Side } from '../../date-picker.type';
import { MONTH, YEAR } from '../constant';
import { calcRangeValue } from '../util';

const bem = buildBem('aui-calendar-header');

@Component({
  selector: 'aui-calendar-header',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgTemplateOutlet, ButtonComponent, IconComponent, I18nPipe],
})
export class CalendarHeaderComponent {
  @Input()
  get dateNavRange() {
    return this.$$dateNavRange();
  }

  set dateNavRange(val) {
    if (!val || this.$$dateNavRange() === val) {
      return;
    }
    this.$$dateNavRange.set(val);
  }

  @Input()
  get anchor() {
    return this.$$anchor();
  }

  set anchor(val) {
    if (!val || this.$$anchor() === val) {
      return;
    }
    this.$$anchor.set(val);
  }

  @Input()
  maxAvail?: ConfigType;

  private get _maxAvail() {
    return this.maxAvail ? dayjs(this.maxAvail) : null;
  }

  @Input()
  minAvail?: ConfigType;

  private get _minAvail() {
    return this.minAvail ? dayjs(this.minAvail) : null;
  }

  @Output()
  navRangeChange = new EventEmitter<DateNavRange>();

  @Output()
  anchorChange = new EventEmitter<Dayjs>();

  private readonly $$dateNavRange = signal(DateNavRange.Month);
  private readonly $$anchor = signal(dayjs());

  bem = bem;

  DateNavRange = DateNavRange;

  $monthBeforeYear = this.i18nService.$monthBeforeYear;

  $headerRange = computed(() => {
    const locale = this.i18nService.$locale();
    const [start, end] = Object.values(
      calcRangeValue(this.$$dateNavRange(), this.$$anchor()),
    ).map(date => date.toDate());

    return {
      start: {
        year: start.toLocaleDateString(locale, { year: 'numeric' }),
        month: start.toLocaleDateString(locale, { month: 'short' }),
      },
      end: {
        year: end?.toLocaleDateString(locale, { year: 'numeric' }),
        month: end?.toLocaleDateString(locale, { month: 'short' }),
      },
    };
  });

  constructor(private readonly i18nService: I18nService) {}

  // maxAvail > current date ：right btn hide
  // minAvail > current date ：left btn hide
  shouldShowNav(type: DateNavRange, side: Side) {
    const availValue = (
      side === Side.Left ? this._minAvail : this._maxAvail
    )?.clone();
    /**
     * 对于 range-picker
     * 左侧部分 minAvail = minDate, maxAvail = min(maxData, rightAnchor)，从而左侧部分的按钮，仅在小于右侧部分时显示
     * 右侧部分 maxAvail = maxDate, minAvail = max(minData, leftAnchor)，从而左侧部分的按钮，仅在小于右侧部分时显示
     */
    if (side === Side.Left) {
      return type === DateNavRange.Month
        ? !this.anchor.subtract(1, 'month').isBefore(availValue, 'month')
        : type === DateNavRange.Year
        ? !this.anchor.subtract(1, 'year').isBefore(availValue, 'year')
        : false;
    }
    return type === DateNavRange.Month
      ? !this.anchor.add(1, 'month').isAfter(availValue, 'month')
      : type === DateNavRange.Year
      ? !this.anchor.add(1, 'year').isAfter(availValue, 'year')
      : false;
  }

  // @return isBetween|isEqual:0, isBefore:-1,isAfter:1
  compareNavValue(type: DateNavRange, constrain: Dayjs, anchor: Dayjs) {
    const range = calcRangeValue(type, anchor);
    const constrainValue = constrain;
    if (type === DateNavRange.Decade) {
      if (constrainValue.isBetween(range.start, range.end, YEAR)) {
        return 0;
      }
      return constrainValue.isBefore(range.start) ? -1 : 1;
    }
    return constrainValue.isSame(range.start, MONTH)
      ? 0
      : constrainValue.isBefore(range.start, MONTH)
      ? -1
      : 1;
  }

  navHead(range: DateNavRange, value: number) {
    let anchor: Dayjs;
    switch (range) {
      case DateNavRange.Month: {
        anchor = this.anchor.add(value, MONTH);
        break;
      }
      case DateNavRange.Year: {
        anchor = this.anchor.add(value, YEAR);
        break;
      }
      case DateNavRange.Decade: {
        anchor = this.anchor.add(value, YEAR);
        break;
      }
    }
    this.anchorChange.next(anchor);
  }

  clickNav = (range: DateNavRange) => {
    if (![DateNavRange.Month, DateNavRange.Year].includes(range)) {
      return;
    }
    this.navRangeChange.next(
      range === DateNavRange.Month ? DateNavRange.Year : DateNavRange.Decade,
    );
  };
}
