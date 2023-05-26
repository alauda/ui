import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

import { updateDateByTimeModel } from '../../date-picker/calendar/util';
import { CommonFormControl } from '../../form/common-form';
import { ComponentSize } from '../../types';
import { buildBem } from '../../utils';
import {
  CONTROL_ITEM_HEIGHT,
  HOUR_ITEMS,
  MINUTE_ITEMS,
  SECOND_ITEMS,
} from '../constant';
import { TimePickerControlType } from '../time-picker.type';

const TIME_PICKER_COLUMN_WIDTH = 80;
const bem = buildBem('aui-time-picker-panel');

@Component({
  selector: 'aui-time-picker-panel',
  templateUrl: './panel.template.html',
  styleUrls: ['./panel.style.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerPanelComponent),
      multi: true,
    },
  ],
})
export class TimePickerPanelComponent
  extends CommonFormControl<Dayjs>
  implements OnChanges
{
  @Input()
  set format(value: string) {
    if (value != null) {
      this._format = value;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has('H') || charSet.has('h');
      this.minuteEnabled = charSet.has('m');
      this.secondEnabled = charSet.has('s');
      this.enabledColumns = [
        this.hourEnabled,
        this.minuteEnabled,
        this.secondEnabled,
      ].filter(Boolean).length;
    }
  }

  get format(): string {
    return this._format;
  }

  private _format: string;

  get totalWidth() {
    return this.enabledColumns * TIME_PICKER_COLUMN_WIDTH;
  }

  @HostListener('mousedown') onMousedown() {
    return false;
  }

  @Input()
  hourStep = 1;

  @Input()
  minuteStep = 1;

  @Input()
  secondStep = 1;

  @Input()
  footerTemplate: TemplateRef<void>;

  @Output()
  confirm = new EventEmitter<void>();

  @Input()
  disableHours: () => number[];

  @Input()
  disableMinutes: (hour?: number) => number[];

  @Input()
  disableSeconds: (hour?: number, minute?: number) => number[];

  hourEnabled: boolean;
  minuteEnabled: boolean;
  secondEnabled: boolean;

  TimePickerControlType = TimePickerControlType;
  HOUR_ITEM_CONFIG = HOUR_ITEMS;
  MINUTE_ITEM_CONFIG = MINUTE_ITEMS;
  SECOND_ITEM_CONFIG = SECOND_ITEMS;

  CONTROL_ITEM_HEIGHT = CONTROL_ITEM_HEIGHT;
  ComponentSize = ComponentSize;
  bem = bem;

  @ViewChild('hourRef', { static: false })
  hourRef: ElementRef<HTMLElement>;

  @ViewChild('minuteRef', { static: false })
  minuteRef: ElementRef<HTMLElement>;

  @ViewChild('secondRef', { static: false })
  secondRef: ElementRef<HTMLElement>;

  enabledColumns = 0;

  // 用于控制初次滚动，是否展示滚动动画效果
  firstScrolled = false;

  constructor(protected override cdr: ChangeDetectorRef) {
    super(cdr);
    this.model$.subscribe(_ => {
      this.cdr.markForCheck();
    });
  }

  isDisabled(value: number, type: TimePickerControlType) {
    const currentValue = this.model;
    if (this.disabled) {
      return true;
    }
    if (type === TimePickerControlType.Hour) {
      return (!this.disableHours ? [] : this.disableHours()).includes(value);
    }
    if (type === TimePickerControlType.Minute) {
      return (
        !this.disableMinutes ? [] : this.disableMinutes(currentValue?.hour())
      ).includes(value);
    }
    if (type === TimePickerControlType.Second) {
      return (
        !this.disableSeconds
          ? []
          : this.disableSeconds(currentValue?.hour(), currentValue?.minute())
      ).includes(value);
    }
  }

  ngOnChanges({ hourStep, minuteStep, secondStep }: SimpleChanges): void {
    if (hourStep?.currentValue > 0) {
      this.HOUR_ITEM_CONFIG = HOUR_ITEMS.filter(
        i => i % hourStep.currentValue === 0,
      );
    }
    if (minuteStep?.currentValue > 0) {
      this.MINUTE_ITEM_CONFIG = MINUTE_ITEMS.filter(
        i => i % minuteStep.currentValue === 0,
      );
    }
    if (secondStep?.currentValue > 0) {
      this.SECOND_ITEM_CONFIG = SECOND_ITEMS.filter(
        i => i % secondStep.currentValue === 0,
      );
    }
    this.cdr.markForCheck();
  }

  override writeValue(value: Dayjs) {
    super.writeValue(value);
    this.syncScrollOffset(!this.firstScrolled ? 0 : 120, value);
  }

  selectValue(value: number, type: TimePickerControlType): void {
    if (this.isDisabled(value, type)) {
      return;
    }
    this.firstScrolled = true;
    const result = this.syncValue(value, type, this.model);
    this.syncScrollOffset(120, result);
  }

  syncValue(value: number, type: TimePickerControlType, currentValue: Dayjs) {
    if (!type) {
      return;
    }
    const result = (
      currentValue ||
      updateDateByTimeModel(dayjs(), { hour: 0, minute: 0, second: 0 })
    ).set(type, value);
    this.emitModel(result);
    return result;
  }

  syncScrollOffset(duration: number, value: Dayjs) {
    const empty = !value;
    const config = [
      {
        ref: this.hourRef,
        enabled: this.hourEnabled,
        step: this.hourStep,
        type: 'hour',
      },
      {
        ref: this.minuteRef,
        enabled: this.minuteEnabled,
        step: this.minuteStep,
        type: 'minute',
      },
      {
        ref: this.secondRef,
        enabled: this.secondEnabled,
        step: this.secondStep,
        type: 'second',
      },
    ] as const;

    config.forEach(cf => {
      if (cf.enabled && cf.ref) {
        this.scrollByValue(
          cf.ref.nativeElement,
          empty ? 0 : value.get(cf.type),
          cf.step,
          empty ? 0 : duration,
        );
      }
    });
    if (!empty) {
      this.firstScrolled = true;
    }
  }

  private scrollByValue(
    element: HTMLElement,
    value: number,
    divideBy: number,
    duration: number,
  ) {
    const targetOffset = (value * CONTROL_ITEM_HEIGHT) / divideBy;
    const currentTop = element.scrollTop;
    if (currentTop === targetOffset) {
      return;
    }
    if (!duration) {
      element.scrollTop = targetOffset;
    } else {
      const difference = targetOffset - currentTop;
      // 每个tick滚动距离
      const perTick = (difference / duration) * 10;

      requestAnimationFrame(() => {
        element.scrollTop = currentTop + perTick;
        if (element.scrollTop === targetOffset) {
          return;
        }
        this.scrollByValue(element, value, divideBy, duration - 10);
      });
    }
  }

  matchValue(
    value: number,
    type: TimePickerControlType,
    currDate: Dayjs,
  ): boolean {
    return currDate?.get(type) === value;
  }

  getControlTypeConfig(type: TimePickerControlType): number[] {
    return {
      [TimePickerControlType.Hour]: this.HOUR_ITEM_CONFIG,
      [TimePickerControlType.Minute]: this.MINUTE_ITEM_CONFIG,
      [TimePickerControlType.Second]: this.SECOND_ITEM_CONFIG,
    }[type];
  }

  selectNow() {
    this.firstScrolled = true;
    this.emitModel(dayjs());
  }

  trackBy(_index: number, content: number) {
    return content;
  }
}
