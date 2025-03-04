import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MultiSelectComponent, SelectModule } from '..';
import { ComponentSize } from '../../internal/types';

describe('multiSelectComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let ocEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('.aui-multi-select'));
    el = debugEl.nativeElement;
    inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
      ocEl = overlayContainer.getContainerElement();
    })();
  });

  it('should properties work correctly', fakeAsync(() => {
    expect(
      el.querySelector('.aui-multi-select__placeholder').innerHTML.trim(),
    ).toBe('');
    expect(el.className).not.toContain('isDisabled');
    expect(el.className).toContain('aui-multi-select--medium');
    ins.selectRef.contentOptions.forEach(option => {
      expect(option.size).toBe(ComponentSize.Medium);
    });
    ins.disabled = true;
    ins.loading = true;
    ins.clearable = true;
    ins.value = [1, 2];
    ins.size = ComponentSize.Large;
    ins.placeholder = 'placeholder';
    fixture.detectChanges();
    tick();
    expect(
      el.querySelector('.aui-multi-select__placeholder').innerHTML,
    ).toContain('placeholder');
    expect(el.className).toContain('isDisabled');
    expect(el.className).toContain('aui-multi-select--large');
    ins.selectRef.contentOptions.forEach(option => {
      expect(option.size).toBe(ComponentSize.Large);
    });
  }));

  it('should ngModel work', fakeAsync(() => {
    expect(el.querySelectorAll(':not(input).aui-tag').length).toBe(0);
    expect(
      ins.selectRef.contentOptions.filter(option => option.selected).length,
    ).toBe(0);
    ins.value = [1, 2];
    fixture.detectChanges();
    tick();
    expect(el.querySelectorAll(':not(input).aui-tag').length).toBe(2);
    expect(
      ins.selectRef.contentOptions.filter(option => option.selected).length,
    ).toBe(2);
    el.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    ocEl
      .querySelectorAll('.aui-option')
      .item(2)
      .dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toEqual([1, 2, 3]);
  }));

  it('should clearable work', fakeAsync(() => {
    ins.clearable = true;
    fixture.detectChanges();
    expect(el.querySelectorAll(':not(input).aui-tag').length).toBe(0);
    expect(
      ins.selectRef.contentOptions.filter(option => option.selected).length,
    ).toBe(0);
    ins.value = [1, 2];
    fixture.detectChanges();
    tick();
    expect(el.querySelectorAll(':not(input).aui-tag').length).toBe(2);
    expect(
      ins.selectRef.contentOptions.filter(option => option.selected).length,
    ).toBe(2);
    const closeEl = el.querySelector('.aui-multi-select__clear');
    closeEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(el.querySelectorAll(':not(input).aui-tag').length).toBe(0);
    expect(
      ins.selectRef.contentOptions.filter(option => option.selected).length,
    ).toBe(0);
    expect(ins.value).toEqual([]);
  }));

  it('should tagClassFn work', fakeAsync(() => {
    ins.value = [1, 2];
    fixture.detectChanges();
    tick();
    expect(el.querySelectorAll('.tag-1').length).toBe(1);
    expect(el.querySelectorAll('.tag-2').length).toBe(1);
  }));
});

@Component({
    template: `
    <aui-multi-select
      #selectRef
      [(value)]="value"
      [disabled]="disabled"
      [size]="size"
      [clearable]="clearable"
      [loading]="loading"
      [placeholder]="placeholder"
      [tagClassFn]="tagClassFn"
      includes
    >
      <aui-option [value]="1">1</aui-option>
      <aui-option [value]="2">2</aui-option>
      <aui-option [value]="3">3</aui-option>
      <aui-option
        [value]="4"
        disabled
        >4</aui-option
      >
    </aui-multi-select>
  `,
    imports: [SelectModule, FormsModule]
})
class TestComponent {
  value: number[];
  disabled: boolean;
  clearable: boolean;
  size: ComponentSize;
  loading: boolean;
  placeholder = '';

  @ViewChild('selectRef', { static: true })
  selectRef: MultiSelectComponent;

  tagClassFn = (_: string, tag: string) => `tag-${tag}`;
}
