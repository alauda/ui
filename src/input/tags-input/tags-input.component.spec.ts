import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputModule } from '../input.module';

describe('TagsInputComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, InputModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('.aui-tags-input')).nativeElement;
    inputEl = el.querySelector('input');
  });

  it('should display input values', fakeAsync(() => {
    ins.value = ['app', 'service'];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const tags = el.querySelectorAll('.aui-tag:not(input)');
    expect(tags.item(0).innerHTML).toContain('app');
    expect(tags.item(1).innerHTML).toContain('service');
  }));

  it('should push new value when press Enter', () => {
    inputEl.value = 'app';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(ins.value).toEqual(['app']);
  });

  it('should last tag could be delete by press Backspace', fakeAsync(() => {
    ins.value = ['app'];
    fixture.detectChanges();
    tick();
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    fixture.detectChanges();
    expect(ins.value).toEqual([]);
  }));

  it('should tag could be delete by click close', fakeAsync(() => {
    ins.value = ['app', 'service'];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const tags = el.querySelectorAll('.aui-tag:not(input)');
    tags
      .item(0)
      .querySelector('.aui-tag__close')
      .dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.value).toEqual(['service']);
  }));

  it('should placeholder show or hidden correctly', fakeAsync(() => {
    ins.placeholder = 'placeholder';
    fixture.detectChanges();
    const placeholderEl = el.querySelector('.aui-tags-input__placeholder');
    expect(placeholderEl.innerHTML).toContain('placeholder');
    expect(placeholderEl.getAttribute('hidden')).toBeNull();
    ins.value = ['app', 'service'];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(placeholderEl.getAttribute('hidden')).toBe('');
  }));
});

@Component({
  template: `
    <aui-tags-input
      [(ngModel)]="value"
      [disabled]="disabled"
      [placeholder]="placeholder"
    ></aui-tags-input>
  `,
})
class TestComponent {
  value: string[];
  disabled: boolean;
  placeholder: string;
}
