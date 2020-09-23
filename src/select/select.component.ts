import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  QueryList,
  TemplateRef,
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
import { coerceString } from '../utils/coercion';

import { BaseSelect } from './base-select';
import { OptionComponent } from './option/option.component';

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
export class SelectComponent
  extends BaseSelect<unknown>
  implements AfterContentInit {
  @ViewChild('inputRef', { static: true })
  inputRef: InputComponent;

  values$ = this.value$$.asObservable().pipe(map(val => [val]));

  selectedOption$: Observable<{
    label: string | TemplateRef<any>;
    labelContext?: any;
  }>;

  hasSelected$: Observable<boolean>;

  get rootClass() {
    return `aui-select aui-select--${this.size}`;
  }

  isClearable = (hasSelected: boolean) => {
    return !this.disabled && this.clearable && hasSelected;
  };

  ngAfterContentInit() {
    super.ngAfterContentInit();

    this.selectedOption$ = combineLatest([
      (this.contentOptions.changes as Observable<
        QueryList<OptionComponent>
      >).pipe(
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
      this.trackFn$,
    ]).pipe(
      map(([option, value, trackFn]) =>
        option
          ? {
              label: option.label || coerceString(trackFn(option.value)),
              labelContext: option.labelContext,
            }
          : { label: coerceString(trackFn(value)) },
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

  onShowOptions() {
    super.onShowOptions();
  }

  onHideOptions() {
    super.onHideOptions();
    this.inputRef.elementRef.nativeElement.value = '';
  }

  writeValue(val: any) {
    this.value$$.next(val);
    this.closeOption();
  }

  selectOption(option: OptionComponent) {
    this.emitValueChange(option.value);
    this.closeOption();
  }

  clearValue(event: Event) {
    this.emitValueChange('');
    event.stopPropagation();
    event.preventDefault();
  }
}
