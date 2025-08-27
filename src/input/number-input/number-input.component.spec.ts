import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  NUMBER_INPUT_MODULE,
  NumberInputComponent,
} from './number-input.component';

describe('InputNumberComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('.aui-number-input'));
    el = debugEl.nativeElement;
    inputEl = el.querySelector('input');
  });

  it('should render correct construction', () => {
    expect(el).not.toBeNull();
    const iconDecreaseEl = el.querySelector(
      '.aui-number-input__control--decrease',
    );
    expect(iconDecreaseEl).not.toBeNull();
    expect(iconDecreaseEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-minus',
    );
    const iconIncreaseEl = el.querySelector(
      '.aui-number-input__control--increase',
    );
    expect(iconIncreaseEl).not.toBeNull();
    expect(iconIncreaseEl.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-plus',
    );
    expect(inputEl).not.toBeNull();
    expect(inputEl.className).toContain('aui-number-input__input');
    expect(inputEl.placeholder).toBe('placeholder');
  });

  it('should set value to input number work correctly', fakeAsync(() => {
    ins.value = 1;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(inputEl.value).toBe('1');
  }));

  it('should decrease value when click decrease button', fakeAsync(() => {
    ins.value = 5;
    fixture.detectChanges();
    tick();
    el.querySelector('.aui-number-input__control--decrease').dispatchEvent(
      new Event('click'),
    );
    fixture.detectChanges();
    expect(ins.value).toBe(4);
  }));

  it('should increase value when click increase button', fakeAsync(() => {
    ins.value = 5;
    fixture.detectChanges();
    tick();
    el.querySelector('.aui-number-input__control--increase').dispatchEvent(
      new Event('click'),
    );
    fixture.detectChanges();
    expect(ins.value).toBe(6);
  }));

  it('should setup option work correctly', fakeAsync(() => {
    ins.value = 5;
    ins.step = 2;
    fixture.detectChanges();
    tick();
    el.querySelector('.aui-number-input__control--increase').dispatchEvent(
      new Event('click'),
    );
    fixture.detectChanges();
    expect(ins.value).toBe(7);
  }));

  it('should min option work correctly', fakeAsync(() => {
    ins.value = 2;
    ins.step = 3;
    ins.min = 0;
    fixture.detectChanges();
    tick();
    const iconDecreaseEl: HTMLButtonElement = el.querySelector(
      '.aui-number-input__control--decrease',
    );
    iconDecreaseEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(ins.value).toBe(0);
    expect(iconDecreaseEl.disabled).toBeTruthy();
  }));

  it('should max option work correctly', fakeAsync(() => {
    ins.value = 2;
    ins.step = 3;
    ins.max = 4;
    fixture.detectChanges();
    tick();
    const iconIncreaseEl: HTMLButtonElement = el.querySelector(
      '.aui-number-input__control--increase',
    );
    iconIncreaseEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toBe(4);
    expect(iconIncreaseEl.disabled).toBeTruthy();
  }));

  it('should precision option work correctly', fakeAsync(() => {
    ins.value = 2.22;
    ins.step = 1;
    ins.min = 1;
    ins.max = 10;
    ins.precision = 1;
    fixture.detectChanges();
    tick();
    const iconIncreaseEl = el.querySelector(
      '.aui-number-input__control--increase',
    );
    iconIncreaseEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toBe(3.2);
  }));

  it('should input element be disabled', fakeAsync(() => {
    ins.disabled = true;
    fixture.detectChanges();
    const iconIncreaseEl: HTMLButtonElement = el.querySelector(
      '.aui-number-input__control--increase',
    );
    const iconDecreaseEl: HTMLButtonElement = el.querySelector(
      '.aui-number-input__control--decrease',
    );
    expect(iconIncreaseEl.disabled).toBeTruthy();
    expect(iconDecreaseEl.disabled).toBeTruthy();
    tick();
    expect(inputEl.disabled).toBeTruthy();
  }));

  it('should input value cannot be cleared by default', fakeAsync(() => {
    ins.value = 2;
    fixture.detectChanges();
    tick();
    ins.inputNumberRef.inputChanged('');
    fixture.detectChanges();
    tick();
    expect(ins.value).toBe(2);
  }));

  it('should input value can be cleared', fakeAsync(() => {
    ins.value = 2;
    ins.clearable = true;
    fixture.detectChanges();
    tick();
    ins.inputNumberRef.inputChanged('');
    fixture.detectChanges();
    tick();
    expect(ins.value).toBe(null);
  }));
});

@Component({
  template: `
    <aui-number-input
      #inputNumberRef
      [size]="size"
      [min]="min"
      [step]="step"
      [precision]="precision"
      [max]="max"
      [disabled]="disabled"
      [(ngModel)]="value"
      [placeholder]="placeholder"
      [clearable]="clearable"
    ></aui-number-input>
  `,
  imports: [FormsModule, ...NUMBER_INPUT_MODULE],
})
class TestComponent {
  size: string;
  min: number;
  step = 1;
  max: number;
  precision: number;
  disabled: boolean;
  placeholder = 'placeholder';
  value = 0;
  clearable = false;

  @ViewChild('inputNumberRef', { static: true })
  inputNumberRef: NumberInputComponent;
}
