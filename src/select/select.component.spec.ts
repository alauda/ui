import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ComponentSize } from '../types';

import { SelectComponent, SelectModule } from './public-api';

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
      imports: [SelectModule, FormsModule],
      declarations: [TestComponent],
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
    ins.value = 5;
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('5');

    optionEls.item(1).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toBe(2);
    expect(getLabelEl().innerHTML).toContain('2');
  });

  it('should clearable work', () => {
    ins.clearable = true;
    fixture.detectChanges();

    expect(ins.value).toBe(1);
    expect(getLabelEl().innerHTML).toContain('1');

    const closeEl = el.querySelector('.aui-select__clear');
    closeEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ins.value).toBe('');
    expect(getLabelEl().textContent).toEqual('');
  });

  it('should label correctly rendered', () => {
    ins.customLabelFn = (val: number) => `custom label for ${val}`;
    expect(getLabelEl().innerHTML).toContain('1');
    fixture.detectChanges();
    expect(getLabelEl().innerHTML).toContain('custom label for 1');
    ins.customLabelFn = (val: number) => `new custom label for ${val}`;
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
    >
      <aui-option
        *ngFor="let val of options"
        [value]="val"
        [label]="customLabelFn(val)"
        [disabled]="disabledOptions.includes(val)"
      >
        {{ val }}
      </aui-option>
    </aui-select>
  `,
})
class TestComponent {
  value = 1;
  disabled: boolean;
  clearable: boolean;
  size: ComponentSize;
  loading: boolean;
  placeholder = '';

  options = [1, 2, 3, 4];
  disabledOptions = [4];

  @ViewChild('selectRef', { static: true })
  selectRef: SelectComponent;

  customLabelFn = (val: number) => `${val}`;
}
