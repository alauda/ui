import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Bem, buildBem } from '../utils/bem';

import { RadioGroupComponent } from './radio-group/radio-group.component';

let uniqueId = 0;

@Component({
  selector: 'aui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class RadioComponent implements OnInit, AfterViewInit, OnDestroy {
  id = `aui-radio-${uniqueId++}`;
  bem: Bem = buildBem('aui-radio');

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

  private _value: any;
  private readonly value$$ = new BehaviorSubject<any>(this.value);
  protected destroy$$ = new Subject<void>();

  get rootClass() {
    return `${this.bem.block()} ${this.disabled ? 'isDisabled' : ''} ${
      this.checked ? 'isChecked' : ''
    }`;
  }

  constructor(
    protected cdr: ChangeDetectorRef,
    protected radioGroup: RadioGroupComponent,
    protected focusMonitor: FocusMonitor,
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
