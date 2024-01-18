import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentSize } from '../internal/types';

import { ButtonComponent } from './button.component';
import { ButtonType } from './button.types';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('button'));
    el = debugEl.nativeElement;
  });

  it('should render correct text content', () => {
    ins.content = 'custom content';
    fixture.detectChanges();
    expect(el.querySelector('.aui-button__content').innerHTML).toContain(
      'custom content',
    );
    expect(el.querySelector('aui-icon')).toBeNull();
  });

  it('should render default class list', () => {
    expect(el.className).toContain('aui-button');
    expect(el.className).toContain('aui-button--default');
    expect(el.className).toContain('aui-button--medium');
    expect(el.className).not.toContain('isPlain');
  });

  it('should render correct type class', () => {
    const typeList = [
      ButtonType.Default,
      ButtonType.Primary,
      ButtonType.Success,
      ButtonType.Warning,
      ButtonType.Danger,
      ButtonType.Text,
    ];

    for (const type of typeList) {
      ins.type = type;
      fixture.detectChanges();
      expect(el.className).toContain(`aui-button--${type}`);
    }
  });

  it('should render correct size class', () => {
    const sizeList = [
      ComponentSize.Large,
      ComponentSize.Medium,
      ComponentSize.Small,
      ComponentSize.Mini,
    ];

    for (const size of sizeList) {
      ins.size = size;
      fixture.detectChanges();
      expect(el.className).toContain(`aui-button--${size}`);
    }
  });

  it('should render correct plain class', () => {
    ins.plain = true;
    fixture.detectChanges();
    expect(el.className).toContain('isPlain');

    ins.plain = false;
    fixture.detectChanges();
    expect(el.className).not.toContain('isPlain');
  });

  it('should render correct round class', () => {
    ins.round = true;
    fixture.detectChanges();
    expect(el.className).toContain('isRound');

    ins.round = false;
    fixture.detectChanges();
    expect(el.className).not.toContain('isRound');
  });

  it('should render spinner icon when loading', () => {
    ins.loading = true;
    fixture.detectChanges();
    expect(el.querySelector('.aui-icon-spinner')).toBeDefined();
  });
});

@Component({
  template: `
    <button
      [aui-button]="type"
      [size]="size"
      [plain]="plain"
      [round]="round"
      [loading]="loading"
    >
      {{ content }}
    </button>
  `,
  standalone: true,
  imports: [ButtonComponent],
})
class TestComponent {
  type: ButtonType;
  size: ComponentSize;
  plain: boolean;
  loading: boolean;
  content = 'text content';
  round: boolean;
}
