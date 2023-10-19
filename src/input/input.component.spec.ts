import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentSize } from '../types';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('input'));
    el = debugEl.nativeElement;
  });

  it('should render correct class', () => {
    expect(el.className).toContain('aui-input');
    expect(el.className).toContain('aui-input--medium');
  });

  it('should size option work correctly', () => {
    ins.size = ComponentSize.Mini;
    fixture.detectChanges();
    expect(el.className).toContain('aui-input--mini');
  });
});

@Component({
  template: '<input aui-input [size]="size">',
  standalone: true,
  imports: [InputComponent],
})
class TestComponent {
  size: ComponentSize;
}
