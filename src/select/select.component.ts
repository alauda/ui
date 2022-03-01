import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { InputComponent } from '../input/public-api';
import { coerceString } from '../utils';

import { BaseSelect } from './base-select';
import { OptionComponent } from './option/option.component';
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
  implements AfterContentInit
{
  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  values$ = this.value$$.asObservable().pipe(map(val => [val]));

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

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.selectedOption$ = combineLatest([
      (
        this.contentOptions.changes as Observable<QueryList<OptionComponent<T>>>
      ).pipe(
        startWith(this.contentOptions),
        switchMap(options =>
          combineLatest(options.map(option => option.selected$)).pipe(
            startWith(null as void),
            map(() => options.find(option => option.selected)),
            distinctUntilChanged(),
            switchMap(option =>
              option
                ? combineLatest([
                    option.value$,
                    option.label$,
                    option.labelContext$,
                  ]).pipe(
                    map(([value, label, labelContext]) => ({
                      value,
                      label,
                      labelContext,
                    })),
                  )
                : of(null as void),
            ),
          ),
        ),
      ),
      this.value$,
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
      publishReplay(1),
      refCount(),
    );

    this.hasSelected$ = this.selectedOption$.pipe(
      map(({ label }) => !!label),
      publishReplay(1),
      refCount(),
    );
  }

  override onShowOptions() {
    super.onShowOptions();
  }

  override onHideOptions() {
    super.onHideOptions();
    this.inputRef.elementRef.nativeElement.value = '';
  }

  override writeValue(val: T) {
    this.value$$.next(val);
    this.closeOption();
  }

  selectOption(option: OptionComponent<T>) {
    this.emitValueChange(option.value);
    this.closeOption();
  }

  clearValue(event: Event) {
    this.emitValueChange(null);
    event.stopPropagation();
    event.preventDefault();
  }
}
