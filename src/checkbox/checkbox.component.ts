import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject, combineLatest, map, takeUntil } from 'rxjs';

import { CommonFormControl } from '../form';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';

let uniqueId = 0;
@Component({
  selector: 'aui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent<T>
  extends CommonFormControl<boolean>
  implements AfterViewInit, OnDestroy
{
  id = `aui-checkbox-${uniqueId++}`;

  @Input()
  name = '';

  @Input()
  type = 'label';

  @Input()
  get label() {
    return this._label;
  }

  set label(val) {
    this._label = val;
    this.label$$.next(val);
  }

  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  set indeterminate(value: boolean) {
    this._indeterminate = value;
  }

  @ViewChild('elRef', { static: true })
  elRef: ElementRef;

  private readonly checkboxGroup: CheckboxGroupComponent<T>;
  private _label: T;
  private readonly label$$ = new BehaviorSubject(this.label);
  private _indeterminate = false;
  private readonly destroy$$ = new Subject<void>();

  constructor(
    cdr: ChangeDetectorRef,
    @Optional()
    @Inject(forwardRef(() => CheckboxGroupComponent))
    checkboxGroup: CheckboxGroupComponent<T>,
    private readonly focusMonitor: FocusMonitor,
  ) {
    super(cdr);
    this.checkboxGroup = checkboxGroup;
    if (this.checkboxGroup) {
      combineLatest([this.checkboxGroup.model$, this.label$$])
        .pipe(
          takeUntil(this.destroy$$),
          map(([values, label]) => {
            if (this.checkboxGroup.trackFn) {
              return values?.some(
                v =>
                  this.checkboxGroup.trackFn(v) ===
                  this.checkboxGroup.trackFn(label),
              );
            }
            return values?.includes(label);
          }),
        )
        .subscribe(checked => {
          this.writeValue(!!checked);
        });
    }
  }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elRef.nativeElement, true);
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
  }

  onClick() {
    if (this.disabled) {
      return;
    }
    if (this.indeterminate) {
      this._indeterminate = false;
    }
    this.emitValue(!this.model);
    if (this.checkboxGroup) {
      this.checkboxGroup.onCheckboxChange(this);
    }
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
    if (this.checkboxGroup) {
      this.checkboxGroup.onCheckboxBlur();
    }
  }
}
