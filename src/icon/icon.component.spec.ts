import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IconModule } from '.';

describe('IconComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('svg'));
    el = debugEl.nativeElement;
  });

  it('should append svg to body', () => {
    const setEl = document.querySelector('.aui-icon-set');

    expect(setEl).not.toBeNull();
    expect(setEl.querySelector('#aui-icon-xmark')).not.toBeNull();
  });

  it('should use correct icon', () => {
    ins.icon = 'xmark';
    ins.margin = 'right';
    fixture.detectChanges();
    expect(el.getAttribute('class')).toContain('aui-icon');
    expect(el.getAttribute('class')).toContain('aui-icon--right');
    expect(el.getAttribute('class')).toContain('aui-icon-xmark');
    expect(el.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-xmark',
    );

    ins.icon = 'search';
    fixture.detectChanges();
    expect(el.getAttribute('class')).toContain('aui-icon-search');
    expect(el.querySelector('use').getAttribute('xlink:href')).toBe(
      '#aui-icon-search',
    );
  });

  it('should apply correct color', () => {
    ins.icon = 'close';
    fixture.detectChanges();
    expect(el.style.fill).toBe('');

    ins.color = 'red';
    fixture.detectChanges();
    expect(el.style.fill).toBe('red');
  });

  it('should apply correct size', () => {
    ins.icon = 'close';
    fixture.detectChanges();
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');

    ins.size = '24px';
    fixture.detectChanges();
    expect(el.style.width).toBe('24px');
    expect(el.style.height).toBe('24px');

    ins.size = '12px,36px';
    fixture.detectChanges();
    expect(el.style.width).toBe('12px');
    expect(el.style.height).toBe('36px');
  });

  it('should use correct custom icon', () => {
    ins.icon = 'custom:close';
    fixture.detectChanges();

    expect(el.getAttribute('class')).toContain('aui-icon');
    expect(el.getAttribute('class')).toContain('custom-close');
    expect(el.querySelector('use').getAttribute('xlink:href')).toBe(
      '#custom-close',
    );
  });

  it('should use correct link icon', () => {
    ins.icon = 'custom:close';
    ins.link = '/icons.svg';
    fixture.detectChanges();

    expect(el.getAttribute('class')).toContain('aui-icon');
    expect(el.getAttribute('class')).toContain('custom-close');
    expect(el.querySelector('use').getAttribute('xlink:href')).toBe(
      '/icons.svg#custom-close',
    );
  });
});

@Component({
  template: `
    <aui-icon
      [icon]="icon"
      [link]="link"
      [margin]="margin"
      [color]="color"
      [size]="size"
    ></aui-icon>
  `,
})
class TestComponent {
  icon = '';
  link = '';
  margin: string;
  color: string;
  size: string;
}
