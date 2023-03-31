import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';

import { InputComponent } from '../input';
import { coerceString, publishRef } from '../utils';

import { BaseSelect } from './base-select';
import { OptionItemComponent } from './option-item/option-item.component';
import { SelectOption } from './select.types';

@Component({
  selector: 'aui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: BaseSelect,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent<T = unknown>
  extends BaseSelect<T>
  implements AfterViewInit
{
  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  values$ = this.model$.asObservable().pipe(map(val => [val]));

  selectedOption$: Observable<SelectOption>;

  hasSelected$: Observable<boolean>;

  get rootClass() {
    return `aui-select aui-select--${this.size}`;
  }

  get containerClass() {
    return `aui-option-container aui-option-container--${this.size}`;
  }

  isClearable = (hasSelected: boolean) =>
    !this.disabled && this.clearable && hasSelected;

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    this.selectedOption$ = combineLatest([
      this.filterOptions$.pipe(
        map(options => {
          const selected = options.find(option => option.selected);
          if (!selected) {
            return;
          }
          const { value, label, labelContext } = selected;
          return {
            value,
            label,
            labelContext,
          };
        }),
      ),
      this.model$,
    ]).pipe(
      map(([option, value]) =>
        option
          ? {
              label:
                option.label ||
                this.labelFn?.(option.value) ||
                coerceString(this.trackFn(option.value)),
              // https://github.com/angular/angular/issues/24515
              labelContext: {
                ...(option.labelContext as Record<string, unknown>),
              },
            }
          : {
              label: this.labelFn?.(value) || coerceString(this.trackFn(value)),
            },
      ),
      publishRef(),
    );

    this.hasSelected$ = this.selectedOption$.pipe(
      map(({ label }) => !!label),
      publishRef(),
    );
  }

  override onShowOptions() {
    super.onShowOptions();
  }

  override onHideOptions() {
    super.onHideOptions();
    this.inputRef.elementRef.nativeElement.value = '';
  }

  protected override valueIn(v: T): T {
    this.closeOption();
    return v;
  }

  selectOption(option: OptionItemComponent<T>) {
    this.emitValue(option.value);
    this.closeOption();
  }

  clearValue(event: Event) {
    this.emitValue(null);
    event.stopPropagation();
    event.preventDefault();
  }
}
