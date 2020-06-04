import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { RadioGroupComponent } from './radio-group/radio-group.component';

let uniqueId = 0;

export class BaseRadio implements OnInit, AfterViewInit, OnDestroy {
  id = `aui-radio-${uniqueId++}`;

  @Input()
  disabled = false;

  @Input()
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.value$$.next(val);
  }

  @ViewChild('elRef', { static: true })
  elRef: ElementRef;

  checked = false;
  name = '';

  protected _value: unknown;
  protected readonly value$$ = new BehaviorSubject(this.value);
  protected destroy$$ = new Subject<void>();

  constructor(
    protected radioGroup: RadioGroupComponent,
    protected focusMonitor: FocusMonitor,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.radioGroup.name$.pipe(takeUntil(this.destroy$$)).subscribe(name => {
      this.name = name;
      this.cdr.markForCheck();
    });

    combineLatest([this.radioGroup.value$, this.value$$])
      .pipe(
        takeUntil(this.destroy$$),
        map(([groupValue, selfValue]) => groupValue === selfValue),
      )
      .subscribe(checked => {
        this.checked = checked;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elRef.nativeElement, true);
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
  }

  onClick() {
    if (this.checked || this.disabled) {
      return;
    }
    this.radioGroup.onRadioChange(this.value);
  }

  onBlur() {
    this.radioGroup.onRadioBlur();
  }
}
