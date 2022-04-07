import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputModule } from '..';
import { IconModule } from '../../icon';
import { ComponentSize } from '../../types';

describe('InputGroupComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let groupEl: HTMLElement;
  let innerWrapperEl: HTMLElement;
  let inputWrapperEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule, IconModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('aui-input-group'));
    el = debugEl.nativeElement;
    groupEl = el.querySelector('.aui-input-group');
    innerWrapperEl = groupEl.querySelector('.aui-input-group__inner-wrapper');
    inputWrapperEl = innerWrapperEl.querySelector(
      '.aui-input-group__input-wrapper',
    );
  });

  it('should render correct component construction', () => {
    expect(groupEl).not.toBeNull();
    expect(groupEl.className).toContain('aui-input-group--medium');
    expect(innerWrapperEl).not.toBeNull();
    expect(
      innerWrapperEl.querySelector('.aui-input-group__input-wrapper'),
    ).not.toBeNull();
  });

  it('should input-wrapper contain aui-input', () => {
    const inputEl = inputWrapperEl.querySelector('input');
    expect(inputEl).not.toBeNull();
    expect(inputEl.className).toContain('aui-input');
    expect(inputEl.className).toContain('aui-input--medium');
  });

  it('should render correct prefix & suffix', () => {
    expect(groupEl.className).toContain('hasPrefix');
    expect(groupEl.className).toContain('hasSuffix');
    expect(
      inputWrapperEl.querySelector('.aui-input-group__prefix'),
    ).not.toBeNull();
    expect(
      inputWrapperEl.querySelector('.aui-input-group__prefix .aui-icon'),
    ).not.toBeNull();
    expect(
      inputWrapperEl.querySelector('.aui-input-group__suffix'),
    ).not.toBeNull();
    expect(
      inputWrapperEl.querySelector('.aui-input-group__suffix .aui-icon'),
    ).not.toBeNull();
  });

  it('should render correct addon', () => {
    const addonEl = innerWrapperEl.querySelectorAll('.aui-input-group__addon');
    expect(addonEl.length).toBe(2);
    expect(addonEl[0]).not.toBeNull();
    expect(addonEl[0].className).toContain('aui-input-group__addon--before');
    expect(addonEl[1]).not.toBeNull();
    expect(addonEl[1].className).toContain('aui-input-group__addon--after');
  });

  it('should size option work correctly', () => {
    ins.size = ComponentSize.Mini;
    fixture.detectChanges();
    expect(groupEl.className).toContain('aui-input-group--mini');
    expect(el.querySelector('input').className).toContain('aui-input--mini');
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  template: `
    <aui-input-group>
      <span auiInputAddonBefore>HTTPS</span>
      <span auiInputAddonAfter>GB</span>
      <aui-icon
        auiInputPrefix
        icon="search_s"
      ></aui-icon>
      <aui-icon
        auiInputSuffix
        icon="spinner"
      ></aui-icon>
      <input
        aui-input
        [size]="size"
        placeholder="placeholder"
      />
    </aui-input-group>
  `,
})
class TestComponent {
  size: ComponentSize;
}
