import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import dayjs, { ConfigType, Dayjs } from 'dayjs';

import { ButtonComponent } from '../../../button/button.component';
import { I18nPipe } from '../../../i18n/i18n.pipe';
import { IconComponent } from '../../../icon/icon.component';
import { buildBem } from '../../../utils';
import {
  CalendarHeaderRange,
  DateNavRange,
  Side,
} from '../../date-picker.type';
import { MONTH, YEAR } from '../constant';
import { calcRangeValue } from '../util';

const bem = buildBem('aui-calendar-header');

@Component({
  selector: 'aui-calendar-header',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, ButtonComponent, IconComponent, I18nPipe],
})
export class CalendarHeaderComponent {
  @Input()
  dateNavRange = DateNavRange.Month;

  @Input()
  anchor = dayjs();

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

  get headerRange(): CalendarHeaderRange {
    return calcRangeValue(this.dateNavRange, this.anchor);
  }

  bem = bem;

  DateNavRange = DateNavRange;

  // maxAvail > current date ：right btn hide
  // minAvail > current date ：left btn hide
  shouldShowNav(type: DateNavRange, side: Side) {
    const availValue = (
      side === Side.Left ? this._minAvail : this._maxAvail
    )?.clone();
    if (!availValue) {
      return true;
    }
    // 对于年的判别，2014-5-1至2015-6-1日，仍当展示按钮
    const constrainDate = [DateNavRange.Month, DateNavRange.Year].includes(type)
      ? availValue.add(side === Side.Left ? 1 : -1, type as 'month' | 'year')
      : availValue;
    return (
      this.compareNavValue(type, constrainDate, this.anchor) ===
      (side === Side.Left ? -1 : 1)
    );
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
