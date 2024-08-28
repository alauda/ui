import { NgClass, NgIf, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { ButtonComponent } from '../../../button/button.component';
import { I18nPipe } from '../../../i18n/i18n.pipe';
import { buildBem } from '../../../internal/utils';
import { DateNavRange } from '../../date-picker.type';
import {
  DAY,
  DAY_PANEL_COLUMN_COUNT,
  DAY_PANEL_ROW_COUNT,
  DatePickerType,
  MONTH,
  MONTH_PANEL_COLUMN_COUNT,
  MONTH_PANEL_ROW_COUNT,
  YEAR,
  YEAR_PANEL_COLUMN_COUNT,
  YEAR_PANEL_ROW_COUNT,
} from '../constant';
import {
  DateCell,
  calcRangeValue,
  composeDisabledDateFn,
  formatDate,
  getDatePanelIterable,
  getNavRangeByType,
  getTypeByNavRange,
  sortDates,
} from '../util';

dayjs.extend(isBetween);

const bem = buildBem('aui-picker-panel');

@Component({
  selector: 'aui-picker-panel',
  templateUrl: './picker-panel.template.html',
  styleUrls: ['./picker-panel.style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ButtonComponent, I18nPipe],
})
export class PickerPanelComponent implements OnChanges {
  @Input()
  navRange: DateNavRange;

  @Input()
  type: DatePickerType;

  @Input()
  anchor = dayjs();

  @Input()
  matchDates: Dayjs[];

  @Input()
  disabledDate: (date: Dayjs, navRange: DateNavRange) => boolean = () => false;

  @Input()
  set weekStartDay(day: number) {
    const normalized = Math.max(Math.min(Math.round(day), 6), 0);
    this.weekDefs = [
      ...this.weekDefs.slice(normalized),
      ...this.weekDefs.slice(0, normalized),
    ];
    this._weekStartDay = normalized;
  }

  get weekStartDay() {
    return this._weekStartDay;
  }

  @Input()
  minDate: Dayjs;

  @Input()
  maxDate: Dayjs;

  get disabledDateFn() {
    return composeDisabledDateFn(
      date => this.minDate && date.isBefore(this.minDate, 'date'),
      (date, navRange) =>
        this.maxDate &&
        (navRange === DateNavRange.Decade
          ? date.isAfter(this.maxDate, 'year')
          : date.isAfter(this.maxDate, 'date')),
      this.disabledDate,
    );
  }

  private _weekStartDay = 0;

  panelData: DateCell[][];

  @Output()
  select = new EventEmitter<Dayjs>();

  @Output()
  hovered = new EventEmitter<Dayjs>();

  bem = bem;
  DateNavRange = DateNavRange;

  weekDefs = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // 如果 dateValue 是一个数组，必然是同一个面板上，否则应当给与不同的面板不同的dateValue值
    const headerRange = calcRangeValue(this.navRange, this.anchor);
    this.renderPanelData(headerRange.start, this.navRange);
  }

  // 根据当前数据，计算渲染表格
   
  renderPanelData(date: Dayjs, navRange: DateNavRange) {
    const value = [];
    let colCounts = 0;
    let rowCounts = 0;
    if (!this.panelData) {
      this.panelData = [[]];
    }
    const [...values] = getDatePanelIterable(date, navRange, this.weekStartDay);
    switch (navRange) {
      case DateNavRange.Month: {
        colCounts = DAY_PANEL_COLUMN_COUNT;
        rowCounts = DAY_PANEL_ROW_COUNT;

        break;
      }
      case DateNavRange.Decade: {
        colCounts = YEAR_PANEL_COLUMN_COUNT;
        rowCounts = YEAR_PANEL_ROW_COUNT;

        break;
      }
      case DateNavRange.Year: {
        colCounts = MONTH_PANEL_COLUMN_COUNT;
        rowCounts = MONTH_PANEL_ROW_COUNT;

        break;
      }
      // No default
    }
    for (let k = 0; k < rowCounts; k++) {
      const row = [];
      for (let i = 0; i < colCounts; i++) {
        const cell = formatDate(navRange, values[k * colCounts + i], date);
        cell.isDisabled = this.disabledDateFn(cell.value, navRange);
        const sortedDates = sortDates(this.matchDates);
        if (sortedDates?.length === 2 && navRange === DateNavRange.Month) {
          if (
            cell.value.isBetween(sortedDates[0], sortedDates[1]) &&
            !cell.isBackground
          ) {
            cell.inRange = true;
          }
          cell.isRangeStart =
            cell.value.isSame(sortedDates[0], DAY) && !cell.isBackground;
          cell.isRangeEnd =
            cell.value.isSame(sortedDates[1], DAY) && !cell.isBackground;
          if (cell.isRangeStart && cell.isRangeEnd) {
            cell.isRangeStart = false;
            cell.isRangeEnd = false;
          }
        }
        row.push(cell);
      }
      value.push(row);
    }
    this.panelData = value.slice();
    this.cdr.markForCheck();
  }

  match(value: Dayjs) {
    if (
      !this.matchDates?.filter(v => !!v)?.length ||
      getNavRangeByType(this.type) !== this.navRange
    ) {
      return false;
    }
    return this.matchDates?.some(dateValue =>
      this.navRange === DateNavRange.Decade
        ? value.isSame(dateValue, YEAR)
        : this.navRange === DateNavRange.Year
        ? value.isSame(dateValue, MONTH)
        : value.isSame(dateValue, DAY),
    );
  }

  matchToday(value: Dayjs) {
    return value.isSame(dayjs(), getTypeByNavRange(this.navRange));
  }

  selectValue(value: Dayjs) {
    this.select.next(value);
  }

  trackByFn() {
    return this.navRange;
  }
}
