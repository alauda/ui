import { OverlayContainer } from '@angular/cdk/overlay';
import { NgForOf } from '@angular/common';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentSize } from '../types';

import { SELECT_MODULE, SelectComponent } from '.';

describe('SelectComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;
  let ocEl: HTMLElement;
  let getLabelEl: () => HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('.aui-select'));
    el = debugEl.nativeElement;
    inputEl = debugEl.query(By.css('input.aui-input'))
      .nativeElement as HTMLInputElement;
    getLabelEl = () => el.querySelector('.aui-select__label');

    inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
      ocEl = overlayContainer.getContainerElement();
    })();
  });

  it('should properties work correctly', () => {
    expect(inputEl.placeholder).toBe('');
    expect(inputEl.disabled).toBeFalsy();
    expect(inputEl.className).toContain('aui-input--medium');
    ins.selectRef.contentOptions.forEach(option => {
      expect(option.size).toBe(ComponentSize.Medium);
    });

    ins.disabled = true;
    ins.loading = true;
    ins.clearable = true;
    ins.size = ComponentSize.Large;
    fixture.detectChanges();

    expect(inputEl.disabled).toBeTruthy();
    expect(inputEl.className).toContain('aui-input--large');
    ins.selectRef.contentOptions.forEach(option => {
      expect(option.size).toBe(ComponentSize.Large);
    });
  });

  it('should [(value)] work', () => {
    el.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const optionEls = ocEl.querySelectorAll('.aui-option');
    expect(optionEls.item(0).className).toContain('isSelected');
    expect(getLabelEl().innerHTML).toContain('1');
    ins.value = {
      label: '5',
      value: 5,
    };
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('5');

    ins.value = {
      label: '0',
      value: Symbol(0),
    };
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('0');

    optionEls.item(1).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value.value).toBe(2);
    expect(getLabelEl().innerHTML).toContain('2');
  });

  it('should clearable work', () => {
    ins.clearable = true;
    fixture.detectChanges();

    expect(ins.value.value).toBe(1);
    expect(getLabelEl().innerHTML).toContain('1');

    const closeEl = el.querySelector('.aui-select__clear');
    closeEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ins.value).toBe(null);
    expect(getLabelEl().textContent).toEqual('');
  });

  it('should label correctly rendered', () => {
    ins.getOptionLabel = (label: string) => `custom label for ${label}`;
    expect(getLabelEl().innerHTML).toContain('1');
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('custom label for 1');
    ins.getOptionLabel = (label: string) => `new custom label for ${label}`;
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('new custom label for 1');
  });
});

@Component({
  template: `
    <aui-select
      #selectRef
      [(value)]="value"
      [disabled]="disabled"
      [clearable]="clearable"
      [size]="size"
      [loading]="loading"
      [placeholder]="placeholder"
      [labelFn]="getCustomOptionLabel"
    >
      <aui-option
        *ngFor="let option of options"
        [value]="option"
        [label]="getOptionLabel(option.label)"
        [disabled]="disabledOptions.includes(option.value)"
      >
        {{ getOptionLabel(option.label) }}
      </aui-option>
    </aui-select>
  `,
  standalone: true,
  imports: [FormsModule, NgForOf, ...SELECT_MODULE],
})
class TestComponent {
  disabled: boolean;
  clearable: boolean;
  size: ComponentSize;
  loading: boolean;
  placeholder = '';

  options = Array.from({ length: 4 }).map((_, index) => {
    const value = index + 1;
    return {
      label: String(value),
      value,
    };
  });

  value: {
    label: string;
    value: number | symbol;
  } = this.options[0];

  disabledOptions = [4];

  @ViewChild('selectRef', { static: true })
  selectRef: SelectComponent;

  getOptionLabel = (label: string): string => label;

  getCustomOptionLabel = (option: { label: string }) => option?.label;
}
